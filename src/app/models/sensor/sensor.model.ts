import { SensorReading } from '../sensor-reading/sensor-reading.model';
import { Board } from '../board/board.model';
import { Gas } from '../gas/gas.model';

export interface Sensor {
    SensorId: string;
    Name: string;
    ShortDescription: string;
    FullDescription: string;
    LoadResistance: number;
    ReceivedVolts: number;
    LastSensorReading: SensorReading;
    Board: Board;
    Gas: Gas;
}