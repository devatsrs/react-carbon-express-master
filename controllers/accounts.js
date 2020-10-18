const { validationResult } = require("express-validator");

exports.get_account = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions

  const Account = require("../models/schema/account");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const account_id = req.body.account_id;

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

exports.get_accounts = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions

  const Account = require("../models/schema/account");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.findAll()
    .then((result) => {
      if (!result) {
        return Promise.reject("No data found!");
      }
      res.status(200).json({ ok: true, text: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json({ error: err });
      next(err);
    });
};
