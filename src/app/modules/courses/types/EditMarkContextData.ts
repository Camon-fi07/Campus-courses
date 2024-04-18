export interface EditMarkContextData {
  studentName: string;
  courseId: string;
  studentId: string;
  markType: MarkType;
  oldMark?: StudentMarks;
}
