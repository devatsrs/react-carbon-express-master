const express = require("express");
const { check, validationResult } = require("express-validator");

const accountController = require("../controllers/accounts");
const isAuth = require("../middleware/is-auth");

const account = require("../models/schema/account");

const router = express.Router();

// put /account/feedback
router.put(
  "/get_account",
  [
    check("account_id")
      .isInt()
      .custom((value, { req }) => {
        return account.findOne({ where: { id: value } }).then((result) => {
          if (!result) {
            return Promise.reject("UserID is not found!");
          }
        });
      }),
    check("account_id").trim().not().isEmpty(),
  ],
  isAuth,
  accountController.get_account
);

router.get("/get_accounts", [], [], accountController.get_accounts);

module.exports = router;
