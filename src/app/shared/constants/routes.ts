export const ROUTES = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PROFILE: '/profile',
  GROUPS: '/groups',
  GROUP_COURSES: (id: string) => `/groups/${id}`,
  MY_COURSES: '/courses/my',
  TEACHING_COURSES: '/courses/teaching',
  CONCRETE_COURSE: (id: string) => `/courses/${id}`,
  HOME: '/',
};
