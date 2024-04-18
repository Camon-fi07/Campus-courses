export const translateSemester = (semester: Semesters) => {
  switch (semester) {
    case 'Autumn':
      return 'Осенний';
    case 'Spring':
      return 'Весенний';
    default:
      return '';
  }
};

export const translateCourseStatus = (status: CourseStatuses) => {
  switch (status) {
    case 'Created':
      return 'Создан';
    case 'Finished':
      return 'Закрыт';
    case 'Started':
      return 'В процессе обучения';
    case 'OpenForAssigning':
      return 'Открыт для записи';
    default:
      return '';
  }
};

export const translateStudentStatus = (status: StudentStatuses) => {
  switch (status) {
    case 'Accepted':
      return 'принят в группу';
    case 'Declined':
      return 'отклонён';
    case 'InQueue':
      return 'в очереди';
  }
};

export const translateStudentMark = (mark: StudentMarks) => {
  switch (mark) {
    case 'Failed':
      return 'зафейлена';
    case 'NotDefined':
      return 'отметки нет';
    case 'Passed':
      return 'успешно пройдена';
  }
};
