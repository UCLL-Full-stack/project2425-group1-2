import { ISP } from '../model/isp';
import isps from '../data/isp';
import tryCatcher from '../util/tryCatchWrapper';

let DBisps: ISP[] = isps;

const findAllByCourseId = tryCatcher((id: number): ISP[] => {
    return DBisps.filter(isp => isp.courses.some(course => course.id === id));
});

export default {
    findAllByCourseId,
};