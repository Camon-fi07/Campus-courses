import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiAlertService } from '@taiga-ui/core';
import { APIUserService } from 'core/API/requests/apiuser.service';
import { UserStateService } from 'core/services/userState.service';
import { Subject, finalize, take, takeUntil } from 'rxjs';
import { convertDateToTui, convertTuiDate } from 'shared/utils';
import { getTuiToday } from 'shared/utils';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  userProfile!: UserProfile | null;
  private unsubscribe = new Subject<void>();
  tuiToday = getTuiToday();

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userStateService: UserStateService,
    private APIUserService: APIUserService,
    private alerts: TuiAlertService,
  ) {
    this.formGroup = fb.group({
      fullName: new FormControl(this.userProfile?.fullName, Validators.required),
      birthDate: new FormControl<TuiDay | null>(null, Validators.required),
    });
  }

  ngOnInit() {
    this.userStateService.userProfile.pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res) => {
        this.isLoading = true;
        this.formGroup.controls['fullName'].setValue(res?.fullName);
        this.formGroup.controls['birthDate'].setValue(convertDateToTui(new Date(res!.birthDate)));
        this.isLoading = false;
        this.userProfile = res;
      },
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  handleSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.APIUserService.editProfile({
        ...this.formGroup.value,
        birthDate: convertTuiDate(this.formGroup.controls['birthDate'].value),
      })
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading = false;
          }),
        )
        .subscribe({
          next: () => {
            this.alerts.open('Профиль успешно обновлён', { status: 'success' }).pipe(take(1)).subscribe();
          },
        });
    }
  }
}
