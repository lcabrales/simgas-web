import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Sensor } from 'src/app/models/sensor/sensor.model';
import { SensorsService } from '../main/sensors.service';
import { SeriesOptionsType } from 'highcharts';
import { StockChart } from 'angular-highcharts';
import { DailyAverageData } from 'src/app/models/daily-average/daily-average.data';
import { AirQuality } from 'src/app/models/air-quality/air-quality.model';
import { SensorReading } from 'src/app/models/sensor-reading/sensor-reading.model';
import { AppComponent } from 'src/app/app.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.scss']
})
export class SensorDetailComponent implements OnInit {

  math = Math;
  sensor: Sensor;
  chart: StockChart;
  airQualityValues: AirQuality[]
  
  displayedColumns: string[] = ['date', 'air-quality', 'sensor-reading', 'sensor-reading-bar'];
  dataSource: MatTableDataSource<SensorReading> = new MatTableDataSource<SensorReading>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    private router: Router,
    private sensorsService: SensorsService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchSensorInfoWithRouteParam();
  }

  fetchSensorInfoWithRouteParam() {
    this.appComponent.showLoading();
    let observable = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.sensorsService.getSensor(params.get('id')))
    );

    observable.subscribe(response => {
      this.appComponent.hideLoading();

      if (response.Result.Code != 200 || response.Data.length == 0) {
        this.appComponent.showAlert(response.Result.Message);
        return;
      }

      this.sensor = response.Data[0];
      this.fetchAirQuality();
      this.fetchDailyAverage();
      this.fetchSensorReadings();
    });
  }

  fetchAirQuality() {
    this.sensorsService.getAirQualityValues(this.sensor.Gas.GasId)
    .subscribe(response => {
      if (response.Result.Code != 200 || response.Data.length == 0) {
        this.appComponent.showAlert(response.Result.Message);
        return;
      }

      this.airQualityValues = response.Data;
    });
  }

  fetchDailyAverage() {
    var series = new Array<SeriesOptionsType>();

    this.sensorsService.getDailyAverageData(this.sensor.SensorId)
    .subscribe(response => {
      if (response.Result.Code != 200) {
        this.appComponent.showAlert(response.Result.Message);
        return;
      }

      series.push(this.buildChartSeriesWith(response.Data))
      this.buildChartWith(series);
    });
  }

  buildChartSeriesWith(dailyAverageData: DailyAverageData) {
    let dataList = new Array();

    dailyAverageData.DailyAverages.forEach(element => {
      let timestamp = this.parseDate(element.CreatedDate).getTime();
      let percentage = Math.min((element.GasPercentage), 1) * 100;
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

  fetchSensorReadings() {
    var date = new Date();
    date.setDate(date.getDate() - 7);
    this.sensorsService.getSensorReadings(this.sensor.SensorId, date.toISOString())
    .subscribe(response => {
      if (response.Result.Code != 200) {
        this.appComponent.showAlert(response.Result.Message);
        return;
      }

      if (response.Data.length > 0){
        this.dataSource.data = response.Data;
      }
    });
  }

  hasData() {
    return this.dataSource && this.dataSource.data && this.dataSource.data.length > 0;
  }

  parseDate(dateString: string) {
    return new Date(dateString);
  }
}