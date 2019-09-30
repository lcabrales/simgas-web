import { AirQuality } from './air-quality.model';
import { Result } from '../result';

export interface AirQualityResponse {
    Data: AirQuality[];
    Result: Result;
}