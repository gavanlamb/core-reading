// Imports the Google Cloud client library
import { Datastore } from '@google-cloud/datastore';

const datastore = new Datastore({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_CLIENT_PRIVATE_KEY,
  },
});

const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const saveRecord = async (topic: string, message: string): Promise<void> => {
  const taskKey = datastore.key(topic);
  let data;
  if (message) {
    if (isJson(message)) {
      data = JSON.parse(message);
    } else {
      data = {
        message: message,
      };
    }
  } else {
    data = {};
  }
  data._date = new Date().toUTCString();

  const entity = {
    key: taskKey,
    data: data,
  };

  await datastore.save(entity);
};

export { saveRecord };
