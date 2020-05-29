import { ProfileDTOModel } from './profile-dto.model'
import { SubjectClassesAssociation } from './subject-classes-association.model'

export interface CreateStaffRequestModel {
  profileDto: ProfileDTOModel,
  subjectClasses: { subjectId: string, classids: Array<string> }[]
}
