import { Semesters } from 'shared/types/courses';

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
