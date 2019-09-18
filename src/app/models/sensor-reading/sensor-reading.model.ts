import { AirQuality } from '../air-quality/air-quality.model';

export interface SensorReading {
    SensorReadingId: string;
    SensorId: string;
    ReadingVolts: number;
    SensorResistance: number;
    KnownConcentrationSensorResistance: number;
    GasPpm: number;
    GasPercentage: number;
    CreatedDate: string;
    AirQuality: AirQuality;
}