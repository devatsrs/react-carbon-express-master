const { validationResult } = require("express-validator");

const Account = require("../models/schema/account");
const helper = require("../util/helper");

// account grid 
exports.all = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }


  const { page, size } = req.query;
  const { limit, offset } = helper.getPagination(page, size);

  Account.findAndCountAll({
    where: { status: 1 }, limit, offset, order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ['id', 'DESC']],
  })
    .then(data => {
      const response = helper.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json({ error: err.message || "default error message." });
      next(err);
    });

};


//get single account 
exports.get_account = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions

  const Account = require("../models/schema/account");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const account_id = req.params.id;


  Account.findOne({ where: { id: account_id } })
    .then((result) => {
      if (!result) {
        return Promise.reject("AccountID is not found!");
      }

      res.status(200).json({ data: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// update single account
exports.update = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = req.params.id;
  const name = req.body.name;

  //  console.log(req.body);

  Account.findOne({ where: { id: id } })
    .then((result) => {

      result.update({ "name": name }).then((result) => {
        res.status(200).json({ "name": name });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json({ error: "Unable to fetch records" });
      next(err);
    });
};