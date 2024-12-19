import { ISP } from '../model/isp';
import isps from '../data/isp';
import { syncTryCatchWrapper } from '../util/tryCatchWrapper';

let DBisps: ISP[] = isps;

const findAllByCourseId = syncTryCatchWrapper((id: number): ISP[] => {
    return DBisps.filter(isp => isp.courses.some(course => course.id === id));
});

export default {
    findAllByCourseId,
};