import { Reading } from '../models/domain';

export interface IReadingRepository {
  saveDeviceReading(reading: Reading): Promise<void>;
}
