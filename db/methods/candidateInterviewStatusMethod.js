import candidateInterviewStatusModel from "../models/candidateInterviewStatus";
import interviewDetailsModel from "../models/interviewDetails";
import interviewRoundModel from "../models/interviewRound";

candidateInterviewStatusModel.belongsTo(interviewDetailsModel, { foreignKey: 'interview_id' });
candidateInterviewStatusModel.belongsTo(interviewRoundModel, { foreignKey: 'round_id' });

export const create = async (payload) => await candidateInterviewStatusModel.create(payload);
export const fetchOne = async (payload) => await candidateInterviewStatusModel.findOne(payload);
export const fetchAll = async (payload) => await candidateInterviewStatusModel.findAll(payload);
export const update = async (payload, where) => await candidateInterviewStatusModel.update(payload, where);
export const destroy = async (payload) => await candidateInterviewStatusModel.destroy(payload);
