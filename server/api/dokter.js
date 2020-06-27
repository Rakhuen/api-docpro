const bcrypt = require("bcryptjs");
const {
  validateSignupDokter,
  validateLoginDokter,
  validateUpdateDokter,
} = require("../validation/isValid");
const connection = require("../config/connection");
const knex = require("knex")(connection);
const fs = require("fs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const cloudinary = require("cloudinary").v2;

exports.signupDokter = async (req, res) => {
  let encryptPassword;

  const today = moment(Date.now()).format("YYYY-MM-DD");

  let signupData = {
    nama: req.body.nama,
    npa: req.body.npa,
    alamat: req.body.alamat,
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    email: req.body.email,
    tanggal_lahir: req.body.tanggal_lahir,
    added_on: today,
    photo: "default.png",
    url_photo: "default.png",
    is_deleted: false,
  };

  const { valid } = validateSignupDokter(signupData);
  if (!valid)
    return res.status(400).json({
      message:
        "All fields is required (nama, npa, alamat, username, password, phone, email, tanggal_lahir)",
      status: 400,
      date: new Date().getTime(),
    });

  try {
    encryptPassword = await bcrypt.hash(req.body.password, 12);
    signupData.password = encryptPassword;

    const searchDokter = await knex("doctor").where({
      username: signupData.username,
      is_deleted: false,
    });
    if (searchDokter.length > 0)
      return res.status(400).json({
        message: "username is already exists",
        status: 400,
        date: new Date().getTime(),
      });

    const insertDokter = await knex("doctor").insert(signupData);
    const id_dokter = insertDokter;

    const dokter = await knex("doctor").where({ id_doctor: id_dokter });
    let data = dokter[0];
    const token = jwt.sign(
      {
        id_doctor: data.id_doctor,
      },
      "docprosupersecretkey",
      { expiresIn: "24h" }
    );

    const tokenEks = new Date().getTime() + 24 * 60 * 60 * 1000;
    return res.status(200).json({
      id_doctor: dokter.id_doctor,
      token,
      expiresToken: tokenEks,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong!",
      status: 400,
      date: new Date().getTime(),
      err,
    });
  }
};

// Untuk Login Dokter
exports.loginDokter = async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
  };
  const { valid, errors } = validateLoginDokter(data);

  if (!valid) {
    if (errors.username && errors.password) {
      return res.status(400).json({
        message: "Username & Password is required",
        status: 400,
        date: new Date().getTime(),
      });
    } else if (errors.username) {
      return res.status(400).json({
        message: "Username is required",
        status: 400,
        date: new Date().getTime(),
      });
    } else if (errors.password) {
      return res.status(400).json({
        message: "Password is required",
        status: 400,
        date: new Date().getTime(),
      });
    }
  }

  try {
    const findDokter = await knex("doctor").where({
      username: data.username,
      is_deleted: false,
    });

    if (findDokter.length === 0)
      return res.status(404).json({
        message: "Doctor not found",
        status: 404,
        date: new Date().getTime(),
      });
    let dokter = findDokter[0];

    const decryptPassword = await bcrypt.compare(
      data.password,
      dokter.password
    );
    if (!decryptPassword)
      return res.status(400).json({
        message: "Passwords are not the same",
        status: 400,
        date: new Date().getTime(),
      });

    const token = jwt.sign(
      { id_doctor: dokter.id_doctor },
      "docprosupersecretkey",
      { expiresIn: "24h" }
    );

    const tokenEks = new Date().getTime() + 24 * 60 * 60 * 1000;
    return res.status(200).json({
      id_doctor: dokter.id_doctor,
      token,
      expiresToken: tokenEks,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      date: new Date().getTime(),
      err,
    });
  }
};

exports.updateDokter = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      date: new Date().getTime(),
    });
  const id_doctor = req.id_doctor;

  let data = {
    nama: req.body.nama,
    npa: req.body.npa,
    alamat: req.body.alamat,
    phone: req.body.phone,
    email: req.body.email,
    tanggal_lahir: req.body.tanggal_lahir,
  };

  const { valid } = validateUpdateDokter(data);
  if (!valid)
    return res.status(400).json({
      message:
        "All fields is required (nama, npa, alamat, username, password, phone, email, tanggal_lahir), except photo",
      status: 400,
      date: new Date().getTime(),
    });

  try {
    const findDokter = await knex("doctor").where({ id_doctor });
    const doctor = findDokter[0];
    let oldProfilePicture = doctor.photo;
    if (!req.file) {
      await knex("doctor").update(data).where({ id_doctor });
      return res.status(200).json({
        message: "Doctor is up to date",
        status: 200,
        date: new Date().getTime(),
      });
    }
    cloudinary.config({
      cloud_name: "dteyro1dc",
      api_key: "173916758465975",
      api_secret: "jl8vCMKUlRlgNEBV2NGepOgpmfQ",
    });

    const path = req.file.path;
    const result = await cloudinary.uploader.upload(
      path,
      { public_id: `${"img-dokter"}/${req.file.filename}`, tags: "img-dokter" },
      (err, img) => {
        if (err) return res.status(500).json(err);
        fs.unlinkSync(path);
        url = img.url;
      }
    );

    data.photo = req.file.filename;
    data.url_photo = result.url;

    await knex("doctor").update(data).where({ id_doctor });
    const findPhotoDocter = await knex("doctor")
      .where({ id_doctor })
      .select("photo");

    const photo = findPhotoDocter[0].photo;
    if (oldProfilePicture === photo) {
      return res.status(200).json({
        message: "Doctor is up to date",
        status: 200,
        date: new Date().getTime(),
      });
    } else if (oldProfilePicture !== photo) {
      const deleteImg = await cloudinary.uploader.destroy(
        `img-dokter/${oldProfilePicture}`
      );
      if (deleteImg.result === "ok")
        console.log({ msg: "img has been deleted", ...result });
      return res.status(200).json({
        message: "Doctor is up to date",
        status: 200,
        date: new Date().getTime(),
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      date: new Date().getTime(),
      err,
    });
  }
};

exports.deleteDokter = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      date: new Date().getTime(),
    });
  const id_doctor_auth = req.id_doctor;
  const id_doctor = req.query.id;

  try {
    const findDoctor = await knex("doctor").where({ id_doctor });
    if (findDoctor.length === 0)
      return res.status(404).json({
        message: "Doctor is not found",
        status: 404,
        date: new Date().getTime(),
      });

    if (id_doctor === id_doctor_auth.toString())
      return res.status(400).json({
        message: "Cant delete your own account",
        status: 400,
        date: new Date().getTime(),
      });

    await knex("doctor").where({ id_doctor }).update({ is_deleted: true });
    return res.status(200).json({
      message: "Doctor is deleted",
      status: 200,
      date: new Date().getTime(),
    });
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      date: new Date().getTime(),
      err,
    });
  }
};

exports.getDataDokter = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      date: new Date().getTime(),
    });
  const id_doctor = req.id_doctor;

  try {
    let dokter = await knex("doctor").where({ id_doctor, is_deleted: false });
    const formatDate = moment(dokter[0].added_on).format("YYYY-MM-DD");
    dokter[0].added_on = formatDate;
    const detailDokter = dokter[0];

    return res.status(200).json(detailDokter);
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      date: new Date().getTime(),
      err,
    });
  }
};
