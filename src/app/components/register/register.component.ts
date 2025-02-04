import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/common/mustmatch.validator';
import { RegisterService } from './register.service';
import { RegisterRequest } from 'src/app/models/register/register.request';
import { LoadingComponent } from '../loading/loading.component';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private DEFAULT_ROLE_ID = "2b4c45c1-7326-4369-9c65-dacb2ebe5c91";
  registerForm: FormGroup;
  requiredMessage: string = "Este campo no debe quedar vacío.";

  constructor(private appComponent: AppComponent,
      private formBuilder: FormBuilder,
      private registerService: RegisterService,
      private loginService: LoginService,
      private router: Router) { }

  ngOnInit() {
    this.appComponent.hideToolbar();

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
    this.appComponent.showLoading();

    this.registerService.register(request)
    .subscribe(response => {
        this.appComponent.hideLoading();

        if (response.Result.Code != 200 || !response.Data) {
          this.appComponent.showAlert(response.Result.Message);
          return;
        }

        this.loginService.setUserLoggedIn(response.Data);
        this.goToMain();
    });
  }

  goToMain() {
    this.router.navigate(['/main']);
  }
}
