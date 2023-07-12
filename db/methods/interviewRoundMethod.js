import interviewRoundModel from '../models/interviewRound.js'
import interviewDetailsModel from '../models/interviewDetails.js'
import candidateStatusModel from '../models/candidateStatus.js'

interviewRoundModel.hasMany(interviewDetailsModel, { foreignKey: 'round_id' });
interviewRoundModel.hasMany(candidateStatusModel, { foreignKey: 'round_id' });

export const create = async payload => await interviewRoundModel.create(payload);
export const fetchOne = async payload => await interviewRoundModel.findOne(payload);
export const fetchAll = async payload => await interviewRoundModel.findAll(payload);
export const update = async (payload, where) => await interviewRoundModel.update(payload, where);
export const destroy = async payload => await interviewRoundModel.destroy(payload);