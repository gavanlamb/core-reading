import * as mqtt from 'mqtt';
import logger from './utilities/logger';
import { saveRecord } from './repositories/readingRepository';
const client = mqtt.connect(process.env.MQTT_URL as string);

client.on('connect', () => {
  client.subscribe('#', (error) => {
    if (error) {
      logger.error(`Error encountered while subscribing to # ${error}`);
    } else {
      logger.info('Subscribed to #');
    }
  });
});

client.on('message', async (topic, message) => {
  await saveRecord(topic, message?.toString() ?? '{}');
});


client.on('error', async (error) => {
  logger.error(`Error encountered: ${error}`);
});
