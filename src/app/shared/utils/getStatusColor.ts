import { CourseStatuses } from 'shared/types/courses';
import { StudentStatuses } from 'shared/types/user';

export const getCourseStatusColor = (status: CourseStatuses) => {
  switch (status) {
    case CourseStatuses.Created:
      return 'var(--tui-neutral-fill)';
    case CourseStatuses.Finished:
      return 'var(--tui-negative)';
    case CourseStatuses.OpenForAssigning:
      return 'var(--tui-positive)';
    case CourseStatuses.Started:
      return 'var(--tui-link)';
    default:
      return 'unset';
  }
};

export const getStudentStatusColor = (status: StudentStatuses) => {
  switch (status) {
    case StudentStatuses.Declined:
      return 'var(--tui-negative)';
    case StudentStatuses.Accepted:
      return 'var(--tui-positive)';
    case StudentStatuses.InQueue:
      return 'var(--tui-link)';
    default:
      return 'unset';
  }
};
