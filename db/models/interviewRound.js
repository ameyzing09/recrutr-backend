import { DataTypes } from "sequelize";

import sequelize from "../dbConfig.js";

export default interviewRound = sequelize.define(
  "interview_round",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    round_number: {
      type: DataTypes.INTEGER,
    },
    round_description: {
      type: DataTypes.STRING,
    },
    created_ts: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("NOW()"),
    },
    updated_ts: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    createdAt: "created_ts",
    updatedAt: "updated_ts",
  }
);
