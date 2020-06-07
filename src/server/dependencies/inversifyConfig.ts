import { Container } from 'inversify';
import { TYPES } from './types';
import { IReadingService } from '../services/iReadingService';
import { ReadingService } from '../services/readingService';
import { IReadingRepository } from '../repositories/iReadingRepository';
import { ReadingRepository } from '../repositories/readingRepository';
import { IMongoDbClient } from '../providers/iMongoDbClient';
import { MongoDbClient } from '../providers/mongoDbClient';
import '../controllers/deviceReadingController';

const container = new Container();
container.bind<IMongoDbClient>(TYPES.MongoDBClient).to(MongoDbClient);
container.bind<IReadingService>(TYPES.ReadingService).to(ReadingService);
container
  .bind<IReadingRepository>(TYPES.ReadingRepository)
  .to(ReadingRepository);

export { container };
