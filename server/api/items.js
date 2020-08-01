const connection = require("../config/connection");
const knex = require("knex")(connection);

const { validateDrug, validateService } = require("../validation/isValid");

const getTimestamp = new Date().getTime();

// Item Service --------------------------------------------------------------
exports.addNewService = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      timestamp: getTimestamp,
    });

  const data = {
    service_name: req.body.service_name,
    service_desc: req.body.service_desc,
    service_price: req.body.service_price,
  };

  const { valid, errors } = validateService(data);
  if (!valid)
    return res.status(400).json({
      message: "Something is invalid...",
      status: 400,
      payload: errors,
      timestamp: getTimestamp,
    });

  try {
    await knex("services").insert(data);
    return res.status(200).json({
      message: "Service is added",
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

exports.deleteService = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      timestamp: getTimestamp,
    });

  const id_service = req.query.id;
  try {
    const findItem = await knex("services").where({ id_service });
    if (findItem.length === 0)
      return res.status(404).json({
        message: "Service is not found",
        status: 404,
        timestamp: getTimestamp,
      });

    await knex("services").where({ id_service }).del();
    return res.status(200).json({
      message: "Service is deleted",
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

exports.getServices = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      timestamp: getTimestamp,
    });

  try {
    const findService = await knex("services");
    return res.status(200).json(findService);
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      timestamp: getTimestamp,
    });
  }
};

exports.detailService = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      timestamp: getTimestamp,
    });

  const id_service = req.query.id;

  try {
    const findItem = await knex("services").where({ id_service });
    if (findItem.length === 0)
      return res.status(404).json({
        message: "Service is not found",
        status: 404,
        timestamp: getTimestamp,
      });

    return res.status(200).json(findItem[0]);
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      timestamp: getTimestamp,
      err,
    });
  }
};

exports.updateService = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      timestamp: getTimestamp,
    });

  const id_service = req.query.id;

  const data = {
    service_name: req.body.service_name,
    service_desc: req.body.service_desc,
    service_price: req.body.service_price,
  };

  const { valid, errors } = validateService(data);
  if (!valid)
    return res.status(400).json({
      message: "Something is invalid...",
      status: 400,
      payload: errors,
      timestamp: getTimestamp,
    });

  try {
    const findService = await knex("services").where({ id_service });
    if (findService.length === 0)
      return res.status(404).json({
        message: "Service is not found",
        status: 404,
        timestamp: getTimestamp,
      });

    await knex("services").where({ id_service }).update(data);
    return res.status(200).json({
      message: "Service is updated",
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

// Item Drug ------------------------------------------------------------------
exports.addNewDrug = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      timestamp: getTimestamp,
    });

  const data = {
    drug_name: req.body.drug_name,
    drug_desc: req.body.drug_desc,
    drug_price: req.body.drug_price,
    drug_count: req.body.drug_count,
  };

  const { valid, errors } = validateDrug(data);
  if (!valid)
    return res.status(400).json({
      message: "Something is invalid...",
      status: 400,
      payload: errors,
      timestamp: getTimestamp,
    });

  try {
    await knex("drugs").insert(data);
    return res.status(200).json({
      message: "Drug is added",
      status: 200,
      timestamp: getTimestamp,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      timestamp: getTimestamp,
    });
  }
};

exports.getDrugs = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      timestamp: getTimestamp,
    });

  try {
    const findDrugs = await knex("drugs");
    return res.status(200).json(findDrugs);
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      timestamp: getTimestamp,
    });
  }
};

exports.detailDrug = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      timestamp: getTimestamp,
    });

  const id_drug = req.query.id;

  try {
    const findDrug = await knex("drugs").where({ id_drug });
    if (findDrug.length === 0)
      return res.status(404).json({
        message: "Drug is not found",
        status: 404,
        timestamp: getTimestamp,
      });

    return res.status(200).json(findDrug[0]);
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      timestamp: getTimestamp,
    });
  }
};

exports.deleteDrug = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      timestamp: getTimestamp,
    });

  const id_drug = req.query.id;
  try {
    const findItem = await knex("drugs").where({ id_drug });
    if (findItem.length === 0)
      return res.status(404).json({
        message: "Drug is not found",
        status: 404,
        timestamp: getTimestamp,
      });

    await knex("drugs").where({ id_drug }).del();
    return res.status(200).json({
      message: "Drug is deleted",
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

exports.updateDrug = async (req, res) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorization",
      status: 401,
      timestamp: getTimestamp,
    });

  const id_drug = req.query.id;

  const data = {
    drug_name: req.body.drug_name,
    drug_desc: req.body.drug_desc,
    drug_price: req.body.drug_price,
    drug_count: req.body.drug_count,
  };

  const { valid, errors } = validateDrug(data);
  if (!valid)
    return res.status(400).json({
      message: "Something is invalid...",
      status: 400,
      payload: errors,
      timestamp: getTimestamp,
    });

  try {
    const findDrug = await knex("drugs").where({ id_drug });
    if (findDrug.length === 0)
      return res.status(404).json({
        message: "Drug is not found",
        status: 404,
        timestamp: getTimestamp,
      });

    await knex("drugs").where({ id_drug }).update(data);
    return res.status(200).json({
      message: "Drug is updated",
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
