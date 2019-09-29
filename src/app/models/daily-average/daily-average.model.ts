import { AirQuality } from '../air-quality/air-quality.model'

export interface DailyAverage {
    CreatedDate: string;
    GasPpm: number;
    GasPercentage: number;
    AirQuality: AirQuality;
}