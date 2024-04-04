import { CourseStatuses, Semesters } from 'shared/types/courses';
import { StudentMarks, StudentStatuses } from 'shared/types/user';

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

export const translateStudentStatus = (status: StudentStatuses) => {
  switch (status) {
    case StudentStatuses.Accepted:
      return 'принят в группу';
    case StudentStatuses.Declined:
      return 'отклонён';
    case StudentStatuses.InQueue:
      return 'в очереди';
  }
};

export const translateStudentMark = (mark: StudentMarks) => {
  switch (mark) {
    case StudentMarks.Failed:
      return 'зафейлена';
    case StudentMarks.NotDefined:
      return 'отметки нет';
    case StudentMarks.Passed:
      return 'успешно пройдена';
  }
};
