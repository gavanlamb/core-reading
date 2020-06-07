import { Db } from 'mongodb';

export interface IMongoDbClient {
  getDatabase(): Promise<Db>;
}
