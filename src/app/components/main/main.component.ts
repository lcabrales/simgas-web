import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { ProfileService } from '../profile/profile.service';
import { ToolbarService } from '../toolbar/toolbar.service';
import { Sensor } from 'src/app/models/sensor/sensor.model';
import { SensorsService } from './sensors.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoadingComponent } from '../loading/loading.component';
import { StockChart } from 'angular-highcharts';
import { DailyAverageData } from 'src/app/models/daily-average/daily-average.data';
import { SeriesOptionsType } from 'highcharts';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  sensors: Sensor[];
  dialogRef: MatDialogRef<LoadingComponent, any>;
  chart: StockChart;
  cols: number;

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

    this.updateCols(window.innerWidth);
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
      if (response.Result.Code != 200 || response.Data.length == 0) {
        this.hideLoading();
        alert(response.Result.Message);
        return;
      }

      this.sensors = response.Data;
      this.fetchDailyAverageData();
    });
  }

  fetchDailyAverageData() {
    var count = this.sensors.length
    var completed = 0;

    var series = new Array<SeriesOptionsType>();

    this.sensors.forEach(sensor => {
      this.sensorsService.getDailyAverageData(sensor.SensorId)
        .subscribe(response => {
          completed++;

          if (response.Result.Code != 200) {
            alert(response.Result.Message);
            return;
          }

          series.push(this.buildChartSeriesWith(response.Data))

          if (completed >= count) {
            completed = 0;
            count = 0;
            this.hideLoading();
            this.buildChartWith(series);
          }
        });
    });
  }

  buildChartSeriesWith(dailyAverageData: DailyAverageData) {
    let dataList = new Array();

    dailyAverageData.DailyAverages.forEach(element => {
      let timestamp = this.parseDate(element.CreatedDate).getTime();
      let percentage = element.GasPercentage > 1 ? 1 : element.GasPercentage;
      percentage *= 100;
      let dataValue = [timestamp, percentage];
      dataList.push(dataValue);
    });

    let serie: SeriesOptionsType = {
      tooltip: {
        valueDecimals: 2
      },
      name: dailyAverageData.Sensor.Name,
      type: 'line',
      data: dataList
    };

    return serie;
  }

  buildChartWith(series){
    this.chart = new StockChart({
      rangeSelector: {
        selected: 1
      },
      credits: {
        enabled: false
      },
      navigator: {
        enabled: false
      },
      legend: {
        enabled: true 
      },
      title: {
        text: null
      },
      series: series,
      yAxis: [{
        title: {
          text: 'Porcentaje Relativo'
        }
      }]
    });
  }

  updateCols(windowWidth: number) {
    this.cols = (windowWidth <= 500) ? 1 : 3;
  }

  onResize(event) {
    this.updateCols(event.target.innerWidth);
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
