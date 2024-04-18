export const getCourseStatusColor = (status: CourseStatuses) => {
  switch (status) {
    case 'Created':
      return 'var(--tui-neutral-fill)';
    case 'Finished':
      return 'var(--tui-negative)';
    case 'OpenForAssigning':
      return 'var(--tui-positive)';
    case 'Started':
      return 'var(--tui-link)';
    default:
      return 'unset';
  }
};

export const getStudentStatusColor = (status: StudentStatuses) => {
  switch (status) {
    case 'Declined':
      return 'var(--tui-negative)';
    case 'Accepted':
      return 'var(--tui-positive)';
    case 'InQueue':
      return 'var(--tui-link)';
    default:
      return 'unset';
  }
};
