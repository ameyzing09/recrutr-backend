import { DataTypes } from "sequelize";
import sequelize from "../dbConfig.js";

const candidateInfo = sequelize.define("candidate_info", {
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
        allowNull: false,
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
        allowNull: false,
    },
    candidate_experience: {
        type: DataTypes.FLOAT(11),
        allowNull: false,
    },
});

export default candidateInfo;
