import { ReadingMessage } from '../models/dto';

export interface IReadingService {
  saveDeviceReading(message: ReadingMessage): Promise<void>;

  getDeviceReadings(deviceId: string, timePeriod: string): Promise<void>;
}
