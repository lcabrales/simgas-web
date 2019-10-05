import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { MatDialog, MatDialogRef } from '@angular/material';
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
  dialogRef: MatDialogRef<LoadingComponent, any>;

  constructor(private appComponent: AppComponent, 
    private loginService: LoginService, 
    public dialog: MatDialog,
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
    this.showLoading();

    this.loginService.login(this.username, this.password)
    .subscribe(response => {
        this.hideLoading();
        this.clearFields();

        if (response.Result.Code != 200) {
          alert(response.Result.Message);
          return;
        }

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
