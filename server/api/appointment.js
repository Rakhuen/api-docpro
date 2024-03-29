const connection = require("../config/connection");
const knex = require("knex")(connection);
const fs = require("fs");
const moment = require("moment");

const { validateAppointment } = require("../validation/isValid");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const getTimestamp = new Date().getTime();

exports.newAppointment = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      timestamp: getTimestamp,
    });

  let data = {
    id_pasien: req.body.id_pasien,
    keperluan: req.body.keperluan,
    tanggal: req.body.tanggal,
    jam: req.body.jam,
    keluhan: req.body.keluhan,
    is_checked: false,
  };

  const { valid, errors } = validateAppointment(data);
  if (!valid)
    return res.status(400).json({
      message: "Something is invalid...",
      status: 400,
      payload: errors,
      timestamp: getTimestamp,
    });

  const newDate = data.tanggal.split("/").reverse().join("-");
  data.tanggal = newDate;

  try {
    const checkPasien = await knex("pasien").where({
      id_pasien: data.id_pasien,
    });
    if (checkPasien.length === 0)
      return res.status(404).json({
        message: "Pasien is not found",
        status: 404,
        timestamp: getTimestamp,
      });
    const checkTanggalDanJam = await knex("appointment").where({
      tanggal: data.tanggal,
      jam: data.jam,
    });
    if (checkTanggalDanJam.length > 0)
      return res.status(400).json({
        message: "Appointment already exists",
        status: 400,
        timestamp: getTimestamp,
      });

    if (!req.file) {
      await knex("appointment").insert(data);
      return res.status(200).json({
        message: "Appointment is successfully created",
        status: 200,
        timestamp: getTimestamp,
      });
    }

    const result = await knex("appointment").insert(data);
    const today = moment(Date.now()).format("YYYY-MM-DD");

    const path = req.file.path;
    const upload = await cloudinary.uploader.upload(
      path,
      { public_id: `${"img-data"}/${req.file.filename}`, tags: "img-data" },
      (err, img) => {
        if (err) return res.status(500).json(err);
        fs.unlinkSync(path);
      }
    );

    const photoForData = {
      id_pasien: data.id_pasien,
      id_appointment: result[0],
      photo: req.file.filename,
      url_photo: upload.url,
      is_checked: false,
      added_on: today,
    };

    await knex("photo_data").insert(photoForData);

    return res.status(200).json({
      message: "Appointment is successfully created",
      status: 200,
      timestamp: getTimestamp,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      timestamp: getTimestamp,
      err,
    });
  }
};

exports.deleteAppointment = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      timestamp: getTimestamp,
    });

  const id = req.query.id;
  try {
    const find = await knex("appointment").where({
      id_appointment: id,
      is_checked: false,
    });
    if (find.length === 0)
      return res.status(404).json({
        message: "Appointment is not found",
        status: 404,
        timestamp: getTimestamp,
      });

    let photo;
    const photo_data = await knex("photo_data").where("id_appointment", id);
    if (photo_data.length === 0) {
      photo = null;
    } else {
      photo = photo_data[0].photo;
      await knex("photo_data").where("id_appointment", id).del();
    }

    await knex("appointment").where("id_appointment", id).del();

    if (photo === null) {
      return res.status(200).json({
        message: "Appointment is deleted",
        status: 200,
        timestamp: getTimestamp,
      });
    } else {
      const deleteImg = await cloudinary.uploader.destroy(`img-data/${photo}`);
      if (deleteImg.result === "ok")
        return res.status(200).json({
          message: "Appointment is deleted",
          status: 200,
          timestamp: getTimestamp,
        });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      timestamp: getTimestamp,
      err,
    });
  }
};

exports.appointment = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      timestamp: getTimestamp,
    });

  const today = moment(Date.now()).format("YYYY-MM-DD");
  try {
    const appointment = await knex("appointment_details").where({
      tanggal: today,
      is_checked: false,
      is_deleted: false,
    });

    if (appointment.length === 0)
      return res.status(404).json({
        message: "Appointment is not found",
        status: 404,
        timestamp: getTimestamp,
      });

    const newAppointment = [];

    appointment.forEach((ap) => {
      const newd = moment(ap.tanggal).format("YYYY-MM-DD");
      ap.tanggal = newd;
      newAppointment.push(ap);
    });
    return res.status(200).json(newAppointment);
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      timestamp: getTimestamp,
      err,
    });
  }
};

exports.filterAppointment = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      timestamp: getTimestamp,
    });
  const tanggal = req.query.tanggal;

  let newTanggal = tanggal.split("/").reverse().join("-");
  const today = moment(Date.now()).format("YYYY-MM-DD");

  if (tanggal === "today" || tanggal === "Today") {
    newTanggal = today;
  }

  try {
    const appointment = await knex("appointment_details").where({
      tanggal: newTanggal,
      is_checked: false,
      is_deleted: false,
    });

    if (appointment.length === 0)
      return res.status(404).json({
        message: "Appointment is not found",
        status: 404,
        timestamp: getTimestamp,
      });

    const newAppointment = [];
    appointment.forEach((ap) => {
      const formatDate = moment(ap.tanggal).format("YYYY-MM-DD");
      ap.tanggal = formatDate;
      newAppointment.push(ap);
    });

    return res.status(200).json(newAppointment);
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 401,
      timestamp: getTimestamp,
      err,
    });
  }
};

exports.getSingleAppointment = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      timestamp: getTimestamp,
    });

  const id_appointment = req.query.id;

  try {
    const appointment = await knex("appointment_details").where({
      id_appointment,
      is_checked: false,
      is_deleted: false,
    });
    if (appointment.length === 0)
      return res.status(404).json({
        message: "Appointment is not found",
        status: 404,
        timestamp: getTimestamp,
      });

    let dataAppointment = appointment[0];
    const formatDate = moment(dataAppointment.tanggal).format("YYYY-MM-DD");
    dataAppointment.tanggal = formatDate;

    return res.status(200).json(dataAppointment);
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      timestamp: getTimestamp,
      err,
    });
  }
};
