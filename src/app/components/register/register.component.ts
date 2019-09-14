import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../toolbar/toolbar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/common/mustmatch.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private toolbarService: ToolbarService,
      private formBuilder: FormBuilder) { }

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

    console.log(this.registerForm.value)
  }

  hasError = (controlName: string, errorName: string) =>{
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  requiredMessage: string = "Este campo no debe quedar vacío."
}
