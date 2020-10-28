
const { sequelize, Sequelize } = require("../../util/database");

module.exports = sequelize.define("accounts", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  company_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  owner_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  vendor: {
    type: Sequelize.TINYINT(1),
    allowNull: false,

  },

  customer: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
  },

  status: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
    defaultValue: 1
  },
  createdAt: {
    type: 'DATETIME',
    defaultValue: Sequelize.literal('NOW()'),
    allowNull: false
  },
  updatedAt: {
    type: 'DATETIME',
    defaultValue: Sequelize.literal('NOW()'),
    allowNull: false
  }

});
