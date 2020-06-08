const connection = require("../config/connection");
const knex = require("knex")(connection);
const fs = require("fs");
const moment = require("moment");
const { validatePasien } = require("../validation/isValid");
const encrypt = require("../util/encrypt");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dteyro1dc",
  api_key: "173916758465975",
  api_secret: "jl8vCMKUlRlgNEBV2NGepOgpmfQ",
});

exports.addPasien = async (req, res) => {
  if (!req.isAuth) return res.status(401).json({ message: "Unauthorization" });

  const today = moment(Date.now()).format("YYYY-MM-DD");

  let data = {
    nama: req.body.nama,
    nik: req.body.nik,
    tanggal_lahir: req.body.tanggal_lahir,
    alamat: req.body.alamat,
    phone: req.body.phone,
    added_on: today,
    is_deleted: false,
  };

  const { valid, errors } = validatePasien(data);
  if (!valid) return res.status(400).json(errors);

  try {
    const nik = encrypt.encryptNik(data.nik);
    const ttl = encrypt.encryptTtl(data.tanggal_lahir);
    const alamat = encrypt.encryptAlamat(data.alamat);
    const phone = encrypt.encryptPhone(data.phone);

    data.nik = nik;
    data.tanggal_lahir = ttl;
    data.alamat = alamat;
    data.phone = phone;

    if (data.alamat.length > 255)
      return res.status(500).json({
        message: "Alamat tidak boleh terlalu panjang, singkat, padat dan jelas",
      });
    const noinduk = await knex("pasien").where({ nik: data.nik });
    if (noinduk.length > 0)
      return res.status(400).json({ message: "Pasien sudah ada" });

    if (!req.file) {
      await knex("pasien").insert(data);
      return res.status(200).json({ message: "User is added" });
    }

    const path = req.file.path;
    const upload = await cloudinary.uploader.upload(
      path,
      { public_id: `${"img-pasien"}/${req.file.filename}`, tags: "img-pasien" },
      (err, img) => {
        if (err) return res.status(500).json(err);
        fs.unlinkSync(path);
      }
    );
    data.photo = req.file.filename;
    data.url_photo = upload.url;

    const result = await knex("pasien").insert(data);
    const id_pasien = result;

    let newPasien = await knex("pasien").where({ id_pasien });

    const formatDate = moment(newPasien[0].added_on).format("YYYY-MM-DD");
    newPasien[0].added_on = formatDate;

    const pasien = newPasien[0];

    return res.status(200).json(pasien);
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong", err });
  }
};

exports.searchPasien = async (req, res) => {
  if (!req.isAuth) return res.status(401).json({ message: "Unauthorization" });
  const nama = req.query.nama;
  try {
    const user = await knex("pasien")
      .where("nama", "like", `%${nama}%`)
      .andWhere({ is_deleted: false })
      .orderBy("id_pasien", "desc");

    if (user.length === 0)
      return res.status(404).json({ message: "Pasien not found" });

    let allPasien = [];
    console.log(user);

    user.forEach((pasien) => {
      const formatDate = moment(pasien.added_on).format("YYYY-MM-DD");
      pasien.added_on = formatDate;
      allPasien.push(pasien);
    });

    return res.status(200).json(allPasien);
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

exports.updatePasien = async (req, res) => {
  if (!req.isAuth) return res.status(401).json({ message: "Unauthorization" });
  const id_pasien = req.query.id;

  let data = {
    nama: req.body.nama,
    nik: req.body.nik,
    tanggal_lahir: req.body.tanggal_lahir,
    alamat: req.body.alamat,
    phone: req.body.phone,
  };

  const { valid, errors } = validatePasien(data);
  if (!valid) return res.status(400).json(errors);

  try {
    const nik = encrypt.encryptNik(data.nik);
    const ttl = encrypt.encryptTtl(data.tanggal_lahir);
    const alamat = encrypt.encryptAlamat(data.alamat);
    const phone = encrypt.encryptPhone(data.phone);

    data.nik = nik;
    data.tanggal_lahir = ttl;
    data.alamat = alamat;
    data.phone = phone;

    if (data.alamat.length > 255)
      return res.status(500).json({
        message: "Alamat tidak boleh terlalu panjang, singkat, padat dan jelas",
      });
    const findUser = await knex("pasien").where({
      id_pasien,
      is_deleted: false,
    });
    if (findUser.length === 0)
      return res.status(404).json({ message: "Pasien is not found" });

    const pasien = findUser[0];
    const oldImagePasien = pasien.photo;
    if (!req.file) {
      await knex("pasien").where({ id_pasien, is_deleted: false }).update(data);
      return res.status(200).json({ message: "Pasien is up to date" });
    }

    const path = req.file.path;
    const result = await cloudinary.uploader.upload(
      path,
      { public_id: `${"img-pasien"}/${req.file.filename}`, tags: "img-pasien" },
      (err, img) => {
        if (err) return res.status(500).json(err);
        fs.unlinkSync(path);
      }
    );
    data.photo = req.file.filename;
    data.url_photo = result.url;

    await knex("pasien").where({ id_pasien, is_deleted: false }).update(data);
    const findPasien = await knex("pasien")
      .where({ id_pasien })
      .select("photo");
    const photo = findPasien[0].photo;

    if (oldImagePasien === photo) {
      return res
        .status(200)
        .json({ message: "Pasien is up to date and photo is not changed" });
    } else if (oldImagePasien !== photo) {
      const deleteImg = await cloudinary.uploader.destroy(
        `img-pasien/${oldImagePasien}`
      );
      if (deleteImg.result === "ok")
        return res.status(200).json({ message: "Pasien is up to date" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Something wrong" });
  }
};

exports.deletePasien = async (req, res) => {
  if (!req.isAuth) return res.status(401).json({ message: "Unauthorization" });
  const id_pasien = req.query.id;

  try {
    const findUser = await knex("pasien").where({
      id_pasien,
      is_deleted: false,
    });
    if (findUser.length === 0)
      return res.status(404).json({ message: "Pasien is not found" });

    await knex("pasien").where({ id_pasien }).update({
      is_deleted: true,
    });

    return res.status(200).json({ message: "Pasien is deleted" });
  } catch (err) {
    return res.status(400).json({ message: "Something wrong" });
  }
};

exports.getAllPasien = async (req, res) => {
  if (!req.isAuth) return res.status(401).json({ message: "Unauthorization" });
  try {
    let pasien = await knex("pasien")
      .select("*")
      .where({ is_deleted: false })
      .orderBy("id_pasien", "desc");

    let allPasien = [];
    pasien.forEach((psien) => {
      const formatDate = moment(psien.added_on).format("YYYY-MM-DD");
      psien.added_on = formatDate;

      allPasien.push(psien);
    });
    return res.status(200).json(allPasien);
  } catch (err) {
    return res.status(400).json({ message: "Something wrong" });
  }
};

exports.getDetailsPasien = async (req, res) => {
  if (!req.isAuth) return res.status(401).json({ message: "Unauthorization" });
  const id_pasien = req.query.id;

  try {
    let findPasien = await knex("pasien").where({
      id_pasien,
      is_deleted: false,
    });

    if (findPasien.length === 0)
      return res.status(404).json({ message: "Pasien is not found" });
    const formatDate = moment(findPasien[0].added_on).format("YYYY-MM-DD");
    findPasien[0].added_on = formatDate;
    const pasien = findPasien[0];

    let historys = [];
    const findHistory = await knex("history")
      .where({
        id_pasien,
        is_deleted: false,
      })
      .orderBy("tanggal", "desc");

    findHistory.forEach((history) => {
      const formatDate = moment(history.tanggal).format("YYYY-MM-DD");
      history.tanggal = formatDate;

      const appointment = {
        id_appointment: history.id_appointment,
        keperluan: history.keperluan,
        tanggal: history.tanggal,
        jam: history.jam,
        keluhan: history.keluhan,
        is_checked: history.is_checked,
      };
      const diagnosa = {
        penanganan: history.penanganan,
        doctor: history.doctor,
        total_biaya: history.total_biaya,
      };

      historys.push({ appointment, diagnosa });
    });

    let photos = [];
    const allPhotosUser = await knex("photo_data")
      .where({
        id_pasien,
        is_checked: true,
      })
      .orderBy("added_on", "desc");

    allPhotosUser.forEach((photo) => {
      const formatDate = moment(photo.added_on).format("YYYY-MM-DD");
      photo.added_on = formatDate;
      photos.push(photo);
    });

    const allUser = { pasien, historys, photos };

    return res.status(200).json(allUser);
  } catch (err) {
    return res.status(400).json({ message: "Something wrong" });
  }
};
