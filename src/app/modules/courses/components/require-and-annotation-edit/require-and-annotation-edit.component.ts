import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'require-and-annotation-edit',
  templateUrl: './require-and-annotation-edit.component.html',
  styleUrl: './require-and-annotation-edit.component.scss',
})
export class RequireAndAnnotationEditComponent implements OnInit {
  @Output() emitSubmit = new EventEmitter<EditCampusCourseRequirementsAndAnnotationsModel>();
  @Input() requirements?: string;
  @Input() annotations?: string;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      requirements: new FormControl(this.requirements, Validators.required),
      annotations: new FormControl(this.annotations, Validators.required),
    });
  }

  handleSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) this.emitSubmit.emit(this.formGroup.value);
  }
}
