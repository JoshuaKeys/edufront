import { TermDetailsDtoModel } from './term-details-dto.model';
import { VacationCreateModel } from './vacation-create.model';

export interface TermCreateModel {
    acadimicStart: string;
    acadimicEnd: string;
    noOfTerm: number;
    schoolId: string;
    termDetailsDtos: TermDetailsDtoModel[],
}