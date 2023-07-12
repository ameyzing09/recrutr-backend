import candidateInfoModel from '../models/candidateInfo.js';
import userModel from '../models/user.js'
import interviewDetailsModel from '../models/interviewDetails.js'

candidateInfoModel.belongsTo(userModel, { foreignKey: 'user_id' });
candidateInfoModel.hasMany(interviewDetailsModel, { foreignKey: 'candidate_id' });

export const create = async payload => await candidateInfoModel.create(payload);
export const fetchOne = async payload => await candidateInfoModel.findOne(payload);
export const fetchAll = async payload => await candidateInfoModel.findAll(payload);
export const fetchAndCountAll = async options => await candidateInfoModel.findAndCountAll(options);
export const update = async (payload, options) => candidateInfoModel.update(payload, options);
export const erase = async options => candidateInfoModel.destroy(options);