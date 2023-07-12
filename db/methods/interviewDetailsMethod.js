import userModel from '../models/user.js'
import candidateInfoModel from '../models/candidateInfo.js';
import interviewDetailsModel from '../models/interviewDetails.js'
import interviewRoundModel from '../models/interviewRound.js';

interviewDetailsModel.belongsTo(candidateInfoModel, { foreignKey: 'candidate_id' });
interviewDetailsModel.belongsTo(userModel, { foreignKey: 'interviewer_id' });
interviewDetailsModel.belongsTo(interviewRoundModel, { foreignKey: 'round_id' });
interviewDetailsModel.hasMany(candidateInterviewStatusModel, { foreignKey: 'interview_id' });

export const create = async payload => await interviewDetailsModel.create(payload);
export const fetchOne = async payload => await interviewDetailsModel.findOne(payload);
export const fetchAll = async payload => await interviewDetailsModel.findAll(payload);
export const update = async (payload, where) => await interviewDetailsModel.update(payload, where);
export const erase = async payload => await interviewDetailsModel.destroy(payload);