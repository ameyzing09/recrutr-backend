import interviewRoundsModel from '../models/interviewRound.js'
import interviewDetailsModel from '../models/interviewDetails.js'
import candidateStatusModel from '../models/candidateStatus.js'

interviewRoundsModel.hasMany(interviewDetailsModel, { foreignKey: 'round_id' });
interviewRoundsModel.hasMany(candidateStatusModel, { foreignKey: 'round_id' });

export const create = async payload => await interviewRoundsModel.create(payload);
export const fetchOne = async payload => await interviewRoundsModel.findOne(payload);
export const fetchAll = async payload => await interviewRoundsModel.findAll(payload);
export const update = async (payload, where) => await interviewRoundsModel.update(payload, where);
export const destroy = async payload => await interviewRoundsModel.destroy(payload);