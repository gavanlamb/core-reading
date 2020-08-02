import { Db, MongoClient } from 'mongodb';
import { IMongoDbClient } from './iMongoDbClient';
import { injectable } from 'inversify';

@injectable()
export class MongoDbClient implements IMongoDbClient {
  private database: Db | undefined;

  public async getDatabase(): Promise<Db> {
    const url = process.env.MongoDBConnectionString as string;
    if (!this.database) {
      const client = await MongoClient.connect(url);
      this.database = await client.db('Reading');
    }
    return this.database;
  }
}
