import { CourseStatuses, Semesters } from 'shared/types/courses';

export const translateSemester = (semester: Semesters) => {
  switch (semester) {
    case Semesters.Autumn:
      return 'Осенний';
    case Semesters.Spring:
      return 'Весенний';
    default:
      return '';
  }
};

export const translateCourseStatus = (status: CourseStatuses) => {
  switch (status) {
    case CourseStatuses.Created:
      return 'Создан';
    case CourseStatuses.Finished:
      return 'Закрыт';
    case CourseStatuses.Started:
      return 'В процессе обучения';
    case CourseStatuses.OpenForAssigning:
      return 'Открыт для записи';
    default:
      return '';
  }
};
