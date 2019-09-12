import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../toolbar/toolbar.service';
import { LoginService } from './login.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoadingComponent } from '../loading/loading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = null;
  password = null;
  dialogRef: MatDialogRef<LoadingComponent, any>;

  constructor(public toolbarService: ToolbarService, 
    private loginService: LoginService, 
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    if (this.loginService.getUserLoggedIn()) {
      this.goToMain();
      return;
    }
    
    this.toolbarService.hide();
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
