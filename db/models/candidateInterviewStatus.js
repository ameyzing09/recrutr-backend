import { DataTypes } from "sequelize";

import sequelize from "../dbConfig.js";

export default candidateInterviewStatus = sequelize.define(
  "candidate_interview_status",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    interview_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "interview_details",
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
    status: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    createdAt: "created_ts",
    updatedAt: "updated_ts",
  }
);
