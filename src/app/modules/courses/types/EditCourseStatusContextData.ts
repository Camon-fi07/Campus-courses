import { CourseStatuses } from 'shared/types/courses';

export interface EditCourseStatusContextData {
  id: string;
  status: CourseStatuses;
}
