import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditCampusCourseRequirementsAndAnnotationsModel } from 'shared/types/courses';

@Component({
  selector: 'require-and-annotation-edit',
  templateUrl: './require-and-annotation-edit.component.html',
  styleUrl: './require-and-annotation-edit.component.scss',
})
export class RequireAndAnnotationEditComponent implements OnInit {
  @Input() requirement?: string;
  @Input() annotation?: string;
  @Output() emitSubmit = new EventEmitter<EditCampusCourseRequirementsAndAnnotationsModel>();
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      requirement: new FormControl(this.requirement, Validators.required),
      annotation: new FormControl(this.annotation, Validators.required),
    });
  }

  handleSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.emitSubmit.emit(this.formGroup.value);
    }
  }
}
