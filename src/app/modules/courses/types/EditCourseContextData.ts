import { EditCourseDto } from 'shared/types/courses';
import { CourseUserRoles } from './CourseUserRoles';

export interface EditCourseContextData extends EditCourseDto {
  id: string;
  userRole: CourseUserRoles | null;
}
