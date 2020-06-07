import Logger from '../utilities/logger';
import { ReadingMessage } from '../models/dto';
import { Reading } from '../models/domain';
import { IReadingRepository } from '../repositories/iReadingRepository';
import { IReadingService } from './iReadingService';
import { inject, injectable } from 'inversify';
import { TYPES } from '../dependencies/types';

@injectable()
export class ReadingService implements IReadingService {
  private readonly readingRepository: IReadingRepository;
  constructor(
    @inject(TYPES.ReadingRepository) readingRepository: IReadingRepository
  ) {
    this.readingRepository = readingRepository;
  }

  public async saveDeviceReading(message: ReadingMessage): Promise<void> {
    const topicCollection = message.topic.split('/');
    if (topicCollection?.length > 0) {
      const reading: Reading = {
        deviceId: topicCollection[1],
        dateAdded: new Date(Date.now()).toISOString(),
        type: topicCollection[2],
        topic: message.topic,
        body: message.body,
      };

      await this.readingRepository.saveDeviceReading(reading);
    }
  }

  public async getDeviceReadings(
    deviceId: string,
    timePeriod: string
  ): Promise<void> {
    Logger.info(deviceId + ' ' + timePeriod);
  }
}
