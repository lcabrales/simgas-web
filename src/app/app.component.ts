import { Component } from '@angular/core';
import { LoginService } from './components/login/login.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingComponent } from './components/loading/loading.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isToolbarVisible: boolean;
  alertDialogRef: MatDialogRef<AlertComponent, any>;
  loadingDialogRef: MatDialogRef<LoadingComponent, any>;

  constructor(private loginService: LoginService,
    private router: Router, 
    public dialog: MatDialog,) { }

  ngOnInit() {
    this.isToolbarVisible = true;
  }

  performLogout() {
    this.loginService.performLogout();
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['/']);
  }

  showToolbar() {
    this.isToolbarVisible = true;
  }

  hideToolbar() {
    this.isToolbarVisible = false;
  }

  showAlert(message: string) {
    this.alertDialogRef = this.dialog.open(AlertComponent);
    this.alertDialogRef.componentInstance.message = message;
  }

  showLoading() {
    this.loadingDialogRef = this.dialog.open(LoadingComponent);
  }

  hideLoading() {
    if (this.loadingDialogRef) {
      this.loadingDialogRef.close();
    }
  }
}
