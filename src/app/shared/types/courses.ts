import { StudentShort, TeacherShort } from './user';

export enum Semesters {
  Autumn = 'Autumn',
  Spring = 'Spring',
}

export enum CourseStatuses {
  Created = 'Created',
  OpenForAssigning = 'OpenForAssigning',
  Started = 'Started',
  Finished = 'Finished ',
}

export interface CourseModel {
  id: string;
  name: string;
  startYear: number;
  maximumStudentsCount: number;
  remainingSlotsCount: number;
  status: CourseStatuses;
  semester: Semesters;
}

export interface NotificationModel {
  text: string;
  isImportant: boolean;
}

export interface AddCampusCourseNotificationModel {
  text: string;
  isImportant: boolean;
}

export interface CourseDetails {
  id: string;
  name: string;
  startYear: number;
  maximumStudentsCount: number;
  studentsEnrolledCount: number;
  studentsInQueueCount: number;
  requirements: string;
  annotations: string;
  status: CourseStatuses;
  semester: Semesters;
  students: StudentShort[];
  teachers: TeacherShort[];
  notifications: NotificationModel[];
}
