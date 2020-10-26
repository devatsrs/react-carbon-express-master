const express = require("express");
const { sequelize } = require("./util/database");

var faker = require("faker");
const Account = require("./models/schema/account");

const app = express();

const insert_into_table = () => {

  const account_data = []
  for (let i = 0; i < 100; i++) {

    account_data.push({
      company_id: 1,
      name: faker.company.companyName(),
      owner_id: 1,
      vendor: 1,
      customer: 1,
    });

  }

  Account.bulkCreate(account_data).then((result) => {
    console.log("inserted ", account_data.length)
  });


}
sequelize
  .sync()
  .then((result) => {
    //console.log(result);

    insert_into_table();

  })
  .catch((err) => {
    console.log(err);
  })



