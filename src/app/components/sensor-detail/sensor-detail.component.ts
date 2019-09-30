import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ToolbarService } from '../toolbar/toolbar.service';
import { Sensor } from 'src/app/models/sensor/sensor.model';
import { SensorsService } from '../main/sensors.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LoadingComponent } from '../loading/loading.component';
import { SeriesOptionsType } from 'highcharts';
import { StockChart } from 'angular-highcharts';
import { DailyAverageData } from 'src/app/models/daily-average/daily-average.data';

@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.scss']
})
export class SensorDetailComponent implements OnInit {

  dialogRef: MatDialogRef<LoadingComponent, any>;
  sensor: Sensor;
  chart: StockChart;
  
  constructor(
    private toolbarService: ToolbarService,
    private route: ActivatedRoute,
    private router: Router,
    private sensorsService: SensorsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.toolbarService.show();

    this.fetchSensorInfoWithRouteParam();
  }

  fetchSensorInfoWithRouteParam() {
    this.showLoading();
    let observable = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.sensorsService.getSensor(params.get('id')))
    );

    observable.subscribe(response => {
      if (response.Result.Code != 200 || response.Data.length == 0) {
        alert(response.Result.Message);
        return;
      }

      this.sensor = response.Data[0];
      this.fetchDailyAverage()
    });
  }

  fetchDailyAverage() {
    var series = new Array<SeriesOptionsType>();

    this.sensorsService.getDailyAverageData(this.sensor.SensorId)
    .subscribe(response => {
      if (response.Result.Code != 200) {
        alert(response.Result.Message);
        return;
      }

      series.push(this.buildChartSeriesWith(response.Data))

      this.hideLoading();
      this.buildChartWith(series);
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
        text: 'Promedio Diario de Lecturas'
      },
      series: series,
      yAxis: [{
        title: {
          text: 'Porcentaje Relativo'
        }
      }]
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
