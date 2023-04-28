import moment from "moment";
import { DataTypes } from "sequelize";

import sequelize from "../dbConfig.js";

const candidateInfo = sequelize.define(
  "candidate_info",
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    candidate_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    candidate_dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    candidate_gender: {
      type: DataTypes.ENUM("MALE", "FEMALE", "OTHER"),
      allowNull: false,
    },
    candidate_education: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    candidate_resume: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    candidate_experience: {
      type: DataTypes.FLOAT(11),
      allowNull: false,
    },
    created_ts: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('NOW()')
    },
    updated_ts: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamp: false,
    createdAt: 'created_ts',
    updatedAt: 'updated_ts'
  }
);

export default candidateInfo;
