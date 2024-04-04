export const API_PATHS = {
  ROOT: 'https://camp-courses.api.kreosoft.space',
  LOGIN: 'login',
  REGISTRATION: 'registration',
  LOGOUT: 'logout',
  PROFILE: 'profile',
  MY_COURSES: 'courses/my',
  COURSES_DETAILS: (id: string) => `courses/${id}/details`,
  EDIT_COURSE: (id: string) => `courses/${id}`,
  EDIT_COURSE_REQUIRE_AND_ANNOTATION: (id: string) => `courses/${id}/requirements-and-annotations`,
  EDIT_COURSE_STATUS: (id: string) => `courses/${id}/status`,
  COURSES_NOTIFICATIONS: (id: string) => `courses/${id}/notifications`,
  COURSES_SIGNUP: (id: string) => `courses/${id}/sign-up`,
  TEACHING_COURSES: 'courses/teaching',
  ROLES: 'roles',
  GROUPS: 'groups',
  CONCRETE_GROUP: (id: string) => `groups/${id}`,
  USERS: 'users',
};
