import { CourseStatuses } from 'shared/types/courses';

export const getStatusColor = (status: CourseStatuses) => {
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
