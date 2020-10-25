const express = require("express");
const { check, validationResult } = require("express-validator");

const accountController = require("../controllers/accounts");
const isAuth = require("../middleware/is-auth");

const account = require("../models/schema/account");

const router = express.Router();

// router.get(
//   "/get/:id",
//   [
//     check("id")
//       .isInt()
//       .custom((value, { req }) => {
//         return account.findOne({ where: { id: value } }).then((result) => {
//           if (!result) {
//             return Promise.reject("Account ID not found!");
//           }
//         });
//       }),
//     check("id").trim().not().isEmpty(),
//   ],
//   isAuth,
//   accountController.get
// );

router.get("/all", [], [], accountController.all);

module.exports = router;
