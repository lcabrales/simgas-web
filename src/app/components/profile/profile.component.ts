import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoadingComponent } from '../loading/loading.component';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { ProfileRequest } from 'src/app/models/profile/profile.request';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  profileForm: FormGroup;
  requiredMessage: string = "Este campo no debe quedar vacío.";
  dialogRef: MatDialogRef<LoadingComponent, any>;

  constructor(private formBuilder: FormBuilder,
      private profileService: ProfileService,
      private dialog: MatDialog,
      private loginService: LoginService,
      private router: Router) { }

  ngOnInit() {
    this.user = this.loginService.getUserLoggedIn();
    this.setupForm()
  }

  setupForm() {
    this.profileForm = this.formBuilder.group({
      username: [this.user.Username, Validators.required],
      firstName: [this.user.FirstName, Validators.required],
      lastName: [this.user.LastName, Validators.required],
      email: [this.user.Email, [Validators.required, Validators.email]],
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    let request: ProfileRequest = {
      UserId: this.user.UserId,
      FirstName: this.f.firstName.value,
      LastName: this.f.lastName.value,
      Email: this.f.email.value,
    }

    this.performUpdate(request);
  }

  performUpdate(request: ProfileRequest) {
    this.showLoading();

    this.profileService.update(request)
    .subscribe(response => {
      this.hideLoading();
      
      if (response.Result.Code != 200) {
        alert(response.Result.Message);
        return;
      }
      
      this.goToMain();
    });
  }

  goToMain() {
    this.router.navigate(['/main']);
  }

  showLoading() {
    this.dialogRef = this.dialog.open(LoadingComponent);
  }

  hideLoading() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
