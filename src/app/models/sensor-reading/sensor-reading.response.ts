import { SensorReading } from './sensor-reading.model';
import { Result } from '../result';

export interface SensorReadingResponse {
    Data: SensorReading[];
    Result: Result;
}