const connection = require("../config/connection");
const knex = require("knex")(connection);
const { validateDiagnosa } = require("../validation/isValid");
const moment = require("moment");

exports.addNewDiagnosa = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      date: new Date().getTime(),
    });
  const id_doctor = req.id_doctor;
  const today = moment(Date.now()).format("YYYY-MM-DD");

  let data = {
    id_appointment: req.body.id_appointment,
    penanganan: req.body.penanganan,
    total_biaya: req.body.total_biaya,
    services: req.body.services,
    drugs: req.body.drugs,
  };

  const { valid } = validateDiagnosa(data);
  if (!valid)
    return res.status(400).json({
      message:
        "All fields is required (id_appointment, penanganan, total_biaya, services, drugs)",
      status: 400,
      date: new Date().getTime(),
    });

  try {
    const findAppointment = await knex("appointment").where({
      id_appointment: data.id_appointment,
    });
    if (findAppointment.length === 0)
      return res.status(404).json({
        message: "Appointment is not found",
        status: 404,
        date: new Date().getTime(),
      });
    const filterDiagnosa = await knex("diagnosa").where({
      id_appointment: data.id_appointment,
    });
    if (filterDiagnosa.length > 0)
      return res.status(400).json({
        message: "Appointment is already diagnosed",
        status: 400,
        date: new Date().getTime(),
      });
    const findDoctor = await knex("doctor").where({ id_doctor });
    data.doctor = findDoctor[0].nama;

    const splitDrugs = data.drugs.split(",");
    const drugs = await knex("drugs").whereIn("id_drug", splitDrugs);
    let drug_count = false;
    drugs.forEach((drug) => {
      if (drug.drug_count === 0) {
        return (drug_count = true);
      }
    });

    if (drug_count)
      return res.status(400).json({
        message: "Drug have 0 values",
        status: 400,
        date: new Date().getTime(),
      });

    const diagnosa = await knex("diagnosa").insert(data);
    const id_diagnosa = diagnosa;
    const id_appointment = await knex("diagnosa").where({ id_diagnosa });

    await knex("appointment")
      .where("id_appointment", id_appointment[0].id_appointment)
      .update({ is_checked: true });
    const findPhoto = await knex("photo_data").where(
      "id_appointment",
      id_appointment[0].id_appointment
    );
    if (findPhoto.length > 0) {
      await knex("photo_data")
        .where("id_appointment", id_appointment[0].id_appointment)
        .update({ is_checked: true, added_on: today });
    }

    drugs.forEach(async (drug) => {
      await knex("drugs")
        .update({
          drug_count: drug.drug_count - 1,
        })
        .where("id_drug", drug.id_drug);
    });

    return res.status(200).json({
      message: "Diagnosa is successfully created",
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
