import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { LoadingComponent } from '../loading/loading.component';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = null;
  password = null;

  constructor(private appComponent: AppComponent, 
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    if (this.loginService.getUserLoggedIn()) {
      this.goToMain();
      return;
    }
    
    this.appComponent.hideToolbar();
  }

  clearFields() {
    this.username = null;
    this.password = null;
  }

  performLogin() {
    this.appComponent.showLoading();

    this.loginService.login(this.username, this.password)
    .subscribe(response => {
        this.appComponent.hideLoading();
        this.clearFields();

        if (response.Result.Code != 200) {
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
