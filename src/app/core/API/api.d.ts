type Semesters = 'Autumn' | 'Spring';

type CourseStatuses = 'Created' | 'OpenForAssigning' | 'Started' | 'Finished';

interface EditCourseDto {
  name: string;
  startYear: number;
  maximumStudentsCount: number;
  semester: Semesters;
  requirements: string;
  annotations: string;
  mainTeacherId: string;
}

interface CreateCourseDto {
  name: string;
  startYear: number;
  maximumStudentsCount: number;
  semester: Semesters;
  requirements: string;
  annotations: string;
  mainTeacherId: string;
}

interface EditCampusCourseRequirementsAndAnnotationsModel {
  requirements: string;
  annotations: string;
}

interface CourseModel {
  id: string;
  name: string;
  startYear: number;
  maximumStudentsCount: number;
  remainingSlotsCount: number;
  status: CourseStatuses;
  semester: Semesters;
}

interface NotificationModel {
  text: string;
  isImportant: boolean;
}

interface AddCampusCourseNotificationModel {
  text: string;
  isImportant: boolean;
}

interface CourseDetails {
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

interface EditCourseStatusModel {
  status: CourseStatuses;
}

interface AddTeacherToCourseModel {
  userId: string;
}

interface EditCourseStudentMarkModel {
  markType: MarkType;
  mark: StudentMarks;
}

interface GroupDto {
  id: string;
  name: string;
}

interface EditCampusGroupModel {
  name: string;
}

interface CreateCampusGroupModel {
  name: string;
}

type StudentStatuses = 'InQueue' | 'Accepted' | 'Declined';

type StudentMarks = 'NotDefined' | 'Passed' | 'Failed';

type MarkType = 'Midterm' | 'Final';

interface UserLoginModel {
  email: string;
  password: string;
}

interface UserRegisterModel {
  fullName: string;
  birthDate: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface TokenResponse {
  token: string;
}

interface UserRoles {
  isTeacher: boolean;
  isStudent: boolean;
  isAdmin: boolean;
}

interface UserShortDto {
  fullName: string;
  id: string;
}

interface UserProfile {
  fullName: string;
  email: string;
  birthDate: string;
}

interface StudentShort {
  id: string;
  name: string;
  email: string;
  status: StudentStatuses;
  midtermResult?: StudentMarks;
  finalResult?: StudentMarks;
}

interface TeacherShort {
  name: string;
  email: string;
  isMain: boolean;
}

interface EditCourseStudentStatusModel {
  status: StudentStatuses;
}

type EditUserProfileModel = Omit<UserProfile, 'email'>;
