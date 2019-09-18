import { Sensor } from './sensor.model';
import { Result } from '../result';

export interface SensorListResponse {
    Data: Sensor[];
    Result: Result;
}