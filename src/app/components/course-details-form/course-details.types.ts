export interface CourseDetailsFormData {
  name: string;
  startYear: number;
  maximumStudentsCount: number;
  semester: Semesters;
  requirements: string;
  annotations: string;
  mainTeacherId: string;
}
