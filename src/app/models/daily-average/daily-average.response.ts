import { DailyAverageData } from './daily-average.data';
import { Result } from '../result';

export interface DailyAverageResponse {
    Data: DailyAverageData;
    Result: Result;
}