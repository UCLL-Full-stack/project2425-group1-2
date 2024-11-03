import { ISP } from '../model/isp';
import ISPRepository from '../repository/isp.db';

const getAllByCourseId = (courseId: number) : ISP[] => {
    return ISPRepository.findAllByCourseId(courseId);
}

export default {
    getAllByCourseId,
}