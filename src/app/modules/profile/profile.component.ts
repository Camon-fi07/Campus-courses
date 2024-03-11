import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { UserService } from 'core/services/user/user.service';
import { UserProfile } from 'shared/types/user';
import { convertDateToTui } from 'shared/utils';

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
        console.log(res);
        this.userProfile = res;
      },
    });
  }

  handleSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    }
  }
}
