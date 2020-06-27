const connection = require("../config/connection");
const knex = require("knex")(connection);
const moment = require("moment");
const encrypt = require("../util/encrypt");

exports.getHitory = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      date: new Date().getTime(),
    });

  try {
    let newHistory = [];
    const history = await knex("history")
      .select("*")
      .where({ is_deleted: false })
      .orderBy("tanggal", "desc")
      .orderBy("jam", "desc");

    if (history.length === 0)
      return res.status(404).json({
        message: "History is not found",
        status: 404,
        date: new Date().getTime(),
      });

    history.forEach(async (hstry) => {
      const formatDate = moment(hstry.tanggal).format("YYYY-MM-DD");
      const nik = encrypt.decryptNik(hstry.nik);
      const alamat = encrypt.decryptAlamat(hstry.alamat);
      const phone = encrypt.decryptPhone(hstry.phone);
      const tanggal_lahir = encrypt.decryptTtl(hstry.tanggal_lahir);

      const splitService = hstry.services.split(",");
      const splitDrugs = hstry.drugs.split(",");

      let services = await knex("services").whereIn("id_service", splitService);
      let drugs = await knex("drugs").whereIn("id_drug", splitDrugs);

      let pasien = {
        id_pasien: hstry.id_pasien,
        nama: hstry.nama,
        nik,
        tanggal_lahir,
        alamat,
        phone,
        photo: hstry.url_photo,
      };
      let appointment = {
        id_appointment: hstry.id_appointment,
        keperluan: hstry.keperluan,
        tanggal: formatDate,
        jam: hstry.jam,
        keluhan: hstry.keluhan,
        is_checked: hstry.is_checked,
      };
      let diagnosa = {
        id_diagnosa: hstry.id_diagnosa,
        penanganan: hstry.penanganan,
        doctor: hstry.doctor,
        services,
        drugs,
        total_biaya: hstry.total_biaya,
      };
      newHistory.push({ pasien, appointment, diagnosa });
    });

    await new Promise((resolve) => setTimeout(resolve, 100));
    await new Promise((resolve) => setTimeout(resolve, 100));

    return res.status(200).json(newHistory);
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      date: new Date().getTime(),
      err,
    });
  }
};
