import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { NotificationContextData } from 'modules/courses/types/NotificationContextData';
import { Observable, take } from 'rxjs';
import { CreatingNotificationComponent } from '../creating-notification/creating-notification.component';
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
  @Input({ required: true }) id!: string;
  @Input({ required: true }) isUserCanEdit!: boolean;
  @Output() refetchDetails = new EventEmitter<void>();
  safeAnnotation?: SafeHtml;
  tabVariants = [
    { key: ContentType.Requirements, text: 'Требования к курсу' },
    { key: ContentType.Annotations, text: 'Аннотация' },
    { key: ContentType.Notifications, text: 'Уведомления' },
  ];
  safeRequirements?: SafeHtml;
  private dialog!: Observable<NotificationContextData>;

  constructor(
    private domSanitizer: DomSanitizer,
    private dialogs: TuiDialogService,
    private readonly injector: Injector,
  ) {}

  ngOnInit() {
    this.safeRequirements = this.domSanitizer.bypassSecurityTrustHtml(this.requirements);
    this.safeAnnotation = this.domSanitizer.bypassSecurityTrustHtml(this.annotations);
    this.dialog = this.dialogs.open<NotificationContextData>(
      new PolymorpheusComponent(CreatingNotificationComponent, this.injector),
      { data: { id: this.id } },
    );

    this.tabVariants[2].text = `${this.tabVariants[2].text} (${this.notifications.length})`;
  }

  ContentType = ContentType;
  valueIndex = 0;

  handleCreateNotification() {
    this.dialog.pipe(take(1)).subscribe({
      next: () => {
        this.refetchDetails.emit();
      },
    });
  }
}
