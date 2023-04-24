import { DataTypes } from "sequelize";

import sequelize from "../dbConfig.js";

const user = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    is_sso_user: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },

    role: {
      type: DataTypes.ENUM("ADMIN", "HR", "INTERVIEWER"),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE", "DELETED"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
export default user;
