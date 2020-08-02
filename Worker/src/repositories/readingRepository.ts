// Imports the Google Cloud client library
import { Datastore } from '@google-cloud/datastore';

const datastore = new Datastore({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_CLIENT_PRIVATE_KEY,
  },
});

const saveRecord = async (topic: string, message: string): Promise<void> => {
  const kind = 'reading';
  const taskKey = datastore.key([kind, name]);
  const data = JSON.parse(message);
  data['_topic'] = topic;

  const entity = {
    key: taskKey,
    data: data,
  };

  await datastore.save(entity);
};

export { saveRecord };
