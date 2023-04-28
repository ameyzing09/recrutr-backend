"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("user", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      username: {
        type: Sequelize.STRING(55),
        allowNull: false,
      },

      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      is_sso_user: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },

      role: {
        type: Sequelize.ENUM("ADMIN", "HR", "INTERVIEWER"),
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE", "DELETED"),
        allowNull: false,
      },
      created_ts: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()')
      },
      updated_ts: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable("candidate_info", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      candidate_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      candidate_dob: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      candidate_gender: {
        type: Sequelize.ENUM("MALE", "FEMALE", "OTHER"),
        allowNull: false,
      },
      candidate_education: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      candidate_resume: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      candidate_experience: {
        type: Sequelize.FLOAT(11),
        allowNull: false,
      },
      created_ts: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('NOW()')
      },
      updated_ts: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("candidate_info");
    await queryInterface.dropTable("users");
  },
};
