import Logger from '../utilities/logger';
import { Reading } from '../models/domain';
import { Collection } from 'mongodb';
import { IReadingRepository } from './iReadingRepository';
import { IMongoDbClient } from '../providers/iMongoDbClient';
import { inject, injectable } from 'inversify';
import { TYPES } from '../dependencies/types';

@injectable()
export class ReadingRepository implements IReadingRepository {
  private deviceReadingCollection: Collection | undefined;
  private readonly mongoDbClient: IMongoDbClient;
  constructor(@inject(TYPES.MongoDBClient) mongoDbClient: IMongoDbClient) {
    this.mongoDbClient = mongoDbClient;
  }

  public async saveDeviceReading(reading: Reading): Promise<void> {
    const collection = await this.getDeviceReadingCollection();
    const result = await collection.insertOne(reading);
    Logger.info(result.result);
  }

  private async getDeviceReadingCollection(): Promise<Collection> {
    if (!this.deviceReadingCollection) {
      const database = await this.mongoDbClient.getDatabase();
      this.deviceReadingCollection = database.collection('DeviceReadings');
    }
    return this.deviceReadingCollection;
  }
}
