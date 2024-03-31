export enum StudentStatuses {
  InQueue = 'InQueue',
  Accepted = 'Accepted',
  Declined = 'Declined',
}

export enum StudentMarks {
  NotDefined = 'NotDefined',
  Passed = 'Passed',
  Failed = 'Failed',
}

export interface UserLoginModel {
  email: string;
  password: string;
}

export interface UserRegisterModel {
  fullName: string;
  birthDate: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TokenResponse {
  token: string;
}

export interface UserRoles {
  isTeacher: boolean;
  isStudent: boolean;
  isAdmin: boolean;
}

export interface UserShortDto {
  fullName: string;
  id: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  birthDate: string;
}

export interface StudentShort {
  id: string;
  name: string;
  email: string;
  status: StudentStatuses;
  midtermResult: StudentMarks;
  finalResult: StudentMarks;
}

export interface TeacherShort {
  name: string;
  email: string;
  isMain: boolean;
}

export type EditUserProfileModel = Omit<UserProfile, 'email'>;
