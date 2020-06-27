const connection = require("../config/connection");
const knex = require("knex")(connection);

const { validateDrug, validateService } = require("../validation/isValid");

// Item Service --------------------------------------------------------------
exports.addNewService = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      date: new Date().getTime(),
    });

  const data = {
    service_name: req.body.service_name,
    service_desc: req.body.service_desc,
    service_price: req.body.service_price,
  };

  const { valid } = validateService(data);
  if (!valid)
    return res.status(400).json({
      message:
        "All fields is required (service_name, service_desc, service_price)",
      status: 400,
      date: new Date().getTime(),
    });

  try {
    await knex("services").insert(data);
    return res.status(200).json({
      message: "Service is added",
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

exports.deleteService = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      date: new Date().getTime(),
    });

  const id_service = req.query.id;
  try {
    const findItem = await knex("services").where({ id_service });
    if (findItem.length === 0)
      return res.status(404).json({
        message: "Service is not found",
        status: 404,
        date: new Date().getTime(),
      });

    await knex("services").where({ id_service }).del();
    return res.status(200).json({
      message: "Service is deleted",
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

exports.getServices = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      date: new Date().getTime(),
    });

  try {
    const findService = await knex("services");
    return res.status(200).json(findService);
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      date: new Date().getTime(),
    });
  }
};

exports.detailService = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      date: new Date().getTime(),
    });

  const id_service = req.query.id;

  try {
    const findItem = await knex("services").where({ id_service });
    if (findItem.length === 0)
      return res.status(404).json({
        message: "Service is not found",
        status: 404,
        date: new Date().getTime(),
      });

    return res.status(200).json(findItem[0]);
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      date: new Date().getTime(),
      err,
    });
  }
};

exports.updateService = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      date: new Date().getTime(),
    });

  const id_service = req.query.id;

  const data = {
    service_name: req.body.service_name,
    service_desc: req.body.service_desc,
    service_price: req.body.service_price,
  };

  const { valid } = validateService(data);
  if (!valid)
    return res.status(400).json({
      message:
        "All fields is required (service_name, service_desc, service_price)",
      status: 400,
      date: new Date().getTime(),
    });

  try {
    const findService = await knex("services").where({ id_service });
    if (findService.length === 0)
      return res.status(404).json({
        message: "Service is not found",
        status: 404,
        date: new Date().getTime(),
      });

    await knex("services").where({ id_service }).update(data);
    return res.status(200).json({
      message: "Service is updated",
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

// Item Drug ------------------------------------------------------------------
exports.addNewDrug = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      date: new Date().getTime(),
    });

  const data = {
    drug_name: req.body.drug_name,
    drug_desc: req.body.drug_desc,
    drug_price: req.body.drug_price,
    drug_count: req.body.drug_count,
  };

  const { valid } = validateDrug(data);
  if (!valid)
    return res.status(400).json({
      message:
        "All fields is required (drug_name, drug_desc, drug_price, drug_count)",
      status: 400,
      date: new Date().getTime(),
    });

  try {
    await knex("drugs").insert(data);
    return res.status(200).json({
      message: "Drug is added",
      status: 200,
      date: new Date().getTime(),
    });
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      date: new Date().getTime(),
    });
  }
};

exports.getDrugs = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      date: new Date().getTime(),
    });

  try {
    const findDrugs = await knex("drugs");
    return res.status(200).json(findDrugs);
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      date: new Date().getTime(),
    });
  }
};

exports.detailDrug = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      date: new Date().getTime(),
    });

  const id_drug = req.query.id;

  try {
    const findDrug = await knex("drugs").where({ id_drug });
    if (findDrug.length === 0)
      return res.status(404).json({
        message: "Drug is not found",
        status: 404,
        date: new Date().getTime(),
      });

    return res.status(200).json(findDrug[0]);
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      date: new Date().getTime(),
    });
  }
};

exports.deleteDrug = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      date: new Date().getTime(),
    });

  const id_drug = req.query.id;
  try {
    const findItem = await knex("drugs").where({ id_drug });
    if (findItem.length === 0)
      return res.status(404).json({
        message: "Drug is not found",
        status: 404,
        date: new Date().getTime(),
      });

    await knex("drugs").where({ id_drug }).del();
    return res.status(200).json({
      message: "Drug is deleted",
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

exports.updateDrug = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      date: new Date().getTime(),
    });

  const id_drug = req.query.id;

  const data = {
    drug_name: req.body.drug_name,
    drug_desc: req.body.drug_desc,
    drug_price: req.body.drug_price,
    drug_count: req.body.drug_count,
  };

  const { valid } = validateDrug(data);
  if (!valid)
    return res.status(400).json({
      message:
        "All fields is required (drug_name, drug_desc, drug_price, drug_count)",
      status: 400,
      date: new Date().getTime(),
    });

  try {
    const findDrug = await knex("drugs").where({ id_drug });
    if (findDrug.length === 0)
      return res.status(404).json({
        message: "Drug is not found",
        status: 404,
        date: new Date().getTime(),
      });

    await knex("drugs").where({ id_drug }).update(data);
    return res.status(200).json({
      message: "Drug is updated",
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
