import { DataTypes } from "sequelize";

import sequelize from "../dbConfig.js";

export default interviewDetail = sequelize.define(
  "interview_detail",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    candidate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "candidate_info",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    round_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "interview_round",
        key: "id",
      },
    },
    interview_date: {
      type: DataTypes.DATE,
    },
    interview_time: {
      type: DataTypes.TIME,
    },
    interview_location: {
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
