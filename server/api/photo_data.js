const connection = require("../config/connection");
const knex = require("knex")(connection);
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dteyro1dc",
  api_key: "173916758465975",
  api_secret: "jl8vCMKUlRlgNEBV2NGepOgpmfQ",
});

exports.addNewPhotoData = async (req, res) => {
  if (!req.isAuth) return res.status(401).json({ message: "Unauthorization" });
  const today = moment(Date.now()).format("YYYY-MM-DD");

  let data = {
    id_pasien: req.body.id_pasien,
    id_appointment: 0,
    is_checked: true,
    added_on: today,
  };

  try {
    const searchPasien = await knex("pasien").where({
      id_pasien: data.id_pasien,
      is_deleted: false,
    });
    if (searchPasien.length === 0)
      return res.status(404).json({ message: "Pasien not found" });

    if (!req.file)
      return res.status(404).json({ message: "Photo is not found" });

    const path = req.file.path;
    const upload = await cloudinary.uploader.upload(
      path,
      { public_id: `${"img-data"}/${req.file.filename}`, tags: "img-data" },
      (err, img) => {
        if (err) return res.status(500).json(err);
        fs.unlinkSync(path);
      }
    );

    data.photo = req.file.filename;
    data.url_photo = upload.url;

    await knex("photo_data").insert(data);
    return res.status(200).json({ message: "Photo is added" });
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

exports.deletePhotoData = async (req, res) => {
  if (!req.isAuth) return res.status(401).json({ message: "Unauthorization" });
  const id = req.query.id;
  try {
    let photo = null;
    const find = await knex("photo_data").where({
      id_photo: id,
      is_checked: true,
    });
    if (find.length === 0)
      return res.status(404).json({ message: "Photo is not found" });

    photo = find[0].photo;
    await knex("photo_data").where({ id_photo: id, is_checked: true }).del();

    if (photo === null) {
      return res.status(200).json({ message: "Photo is deleted" });
    } else {
      const deleteImg = await cloudinary.uploader.destroy(`img-data/${photo}`);
      if (deleteImg.result === "ok")
        return res.status(200).json({ message: "Photo is deleted" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};
