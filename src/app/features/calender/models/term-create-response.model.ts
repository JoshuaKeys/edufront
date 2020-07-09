import { TermDetailsDtoModel } from './term-details-dto.model';

export interface TermCreateResponseModel {
  id: string;
  acadimicStart: string;
  acadimicEnd: string;
  noOfTerm: number;
  schoolId: string;
  termDetailsDtos: TermDetailsDtoModel[]
}
