import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NotificationModel } from 'shared/types/courses';
import { ContentType } from './course-short-info.types';

@Component({
  selector: 'course-short-info',
  templateUrl: './course-short-info.component.html',
  styleUrl: './course-short-info.component.scss',
})
export class CourseShortInfoComponent implements OnInit {
  @Input({ required: true }) annotations!: string;
  @Input({ required: true }) requirements!: string;
  @Input({ required: true }) notifications!: NotificationModel[];
  safeAnnotation?: SafeHtml;
  safeRequirements?: SafeHtml;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this.safeRequirements = this.domSanitizer.bypassSecurityTrustHtml(this.requirements);
    this.safeAnnotation = this.domSanitizer.bypassSecurityTrustHtml(this.annotations);
  }

  ContentType = ContentType;

  tabVariants = [
    { key: ContentType.Requirements, text: 'Требования к курсу' },
    { key: ContentType.Annotations, text: 'Аннотация' },
    { key: ContentType.Notifications, text: 'Уведомления' },
  ];
  valueIndex = 0;
}
