import { EditCourseDto } from 'shared/types/courses';

export interface EditCourseContextData extends EditCourseDto {
  id: string;
}
