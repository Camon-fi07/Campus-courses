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
