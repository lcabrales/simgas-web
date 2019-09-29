import { Sensor } from '../sensor/sensor.model';
import { DailyAverage } from './daily-average.model';

export interface DailyAverageData {
    Sensor: Sensor;
    DailyAverages: DailyAverage[];
}