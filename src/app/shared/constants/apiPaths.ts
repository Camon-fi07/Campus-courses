export const API_PATHS = {
  ROOT: 'https://camp-courses.api.kreosoft.space',
  LOGIN: 'login',
  REGISTRATION: 'registration',
  LOGOUT: 'logout',
  PROFILE: 'profile',
  MY_COURSES: 'courses/my',
  COURSES_DETAILS: (id: string) => `courses/${id}/details`,
  TEACHING_COURSES: 'courses/teaching',
  ROLES: 'roles',
  GROUPS: 'groups',
  CONCRETE_GROUP: (id: string) => `groups/${id}`,
};
