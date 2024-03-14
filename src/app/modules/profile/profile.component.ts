import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiAlertService } from '@taiga-ui/core';
import { ProfileService } from 'core/services/profile/profile.service';
import { UserService } from 'core/services/user/user.service';
import { UserProfile } from 'shared/types/user';
import { convertDateToTui, convertTuiDate } from 'shared/utils';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  formGroup!: FormGroup;
  userProfile!: UserProfile | null;
  private dateNow = new Date();
  maxDate = new TuiDay(this.dateNow.getFullYear(), this.dateNow.getMonth(), this.dateNow.getDate());
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService,
    private alerts: TuiAlertService,
  ) {
    this.formGroup = fb.group({
      fullName: new FormControl(this.userProfile?.fullName, Validators.required),
      birthDate: new FormControl<TuiDay | null>(null, Validators.required),
    });

    userService.userProfile.subscribe({
      next: (res) => {
        this.isLoading = true;
        this.formGroup.controls['fullName'].setValue(res?.fullName);
        this.formGroup.controls['birthDate'].setValue(convertDateToTui(new Date(res!.birthDate)));
        this.isLoading = false;
        this.userProfile = res;
      },
    });
  }

  handleSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.profileService
        .editProfile({
          ...this.formGroup.value,
          birthDate: convertTuiDate(this.formGroup.controls['birthDate'].value),
        })
        .subscribe({
          next: () => {
            this.alerts
              .open('Профиль успешно обновлён', {
                status: 'success',
              })
              .subscribe();
            this.isLoading = false;
          },
          error: (e) => {
            this.alerts.open(e.message, { label: 'Произошла ошибка', status: 'error' }).subscribe();
            this.isLoading = false;
          },
        });
    }
  }
}
