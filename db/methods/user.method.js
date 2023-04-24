import userModel from '../models/user.js'
import candidateInfoModel from '../models/candidateInfo.js';

userModel.hasMany(candidateInfoModel, { foreignKey: 'user_id' });

export const create = async payload => await userModel.create(payload);
export const fetchOne = async payload => await userModel.findOne(payload);
export const fetchAll = async payload => await userModel.findAll(payload);
