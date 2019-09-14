import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../toolbar/toolbar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/common/mustmatch.validator';
import { RegisterService } from './register.service';
import { RegisterRequest } from 'src/app/models/register/register.request';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoadingComponent } from '../loading/loading.component';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private DEFAULT_ROLE_ID = "2b4c45c1-7326-4369-9c65-dacb2ebe5c91";
  registerForm: FormGroup;
  requiredMessage: string = "Este campo no debe quedar vacío.";
  dialogRef: MatDialogRef<LoadingComponent, any>;

  constructor(private toolbarService: ToolbarService,
      private formBuilder: FormBuilder,
      private registerService: RegisterService,
      private dialog: MatDialog,
      private loginService: LoginService,
      private router: Router) { }

  ngOnInit() {
    this.toolbarService.hide();

    this.setupForm()
  }

  setupForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
  })
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    let request: RegisterRequest = {
      RoleId: this.DEFAULT_ROLE_ID,
      Username: this.f.username.value,
      FirstName: this.f.firstName.value,
      LastName: this.f.lastName.value,
      Email: this.f.email.value,
      Password: this.f.password.value
    }

    this.performRegister(request);
  }

  performRegister(request: RegisterRequest) {
    this.showLoading();

    this.registerService.register(request)
    .subscribe(response => {
        this.hideLoading();
        this.loginService.setUserLoggedIn(response.Data);
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
