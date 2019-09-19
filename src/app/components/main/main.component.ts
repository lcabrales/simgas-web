import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { ProfileService } from '../profile/profile.service';
import { ToolbarService } from '../toolbar/toolbar.service';
import { Sensor } from 'src/app/models/sensor/sensor.model';
import { SensorsService } from './sensors.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  sensors: Sensor[];
  dialogRef: MatDialogRef<LoadingComponent, any>;

  constructor(private toolbarService: ToolbarService,
    private loginService: LoginService, 
    private router: Router,
    private profileService: ProfileService,
    private sensorsService: SensorsService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.toolbarService.show();
    this.updateLoggedInUser();
    this.fetchSensors();
  }

  updateLoggedInUser(){
    let user = this.loginService.getUserLoggedIn();
    this.profileService.get(user.UserId)
    .subscribe(response => {
      if (response.Result.Code != 200 || response.Data.length == 0) {
        alert(response.Result.Message);
        return;
      }

      this.loginService.setUserLoggedIn(response.Data[0]);
    });
  }

  fetchSensors() {
    this.showLoading();
    this.sensorsService.getAll()
    .subscribe(response => {
      this.hideLoading();

      if (response.Result.Code != 200 || response.Data.length == 0) {
        alert(response.Result.Message);
        return;
      }

      this.sensors = response.Data;
    });
  }

  showLoading() {
    this.dialogRef = this.dialog.open(LoadingComponent);
  }

  hideLoading() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  parseDate(dateString: string) {
    return new Date(dateString);
  }
}
