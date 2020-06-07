import 'reflect-metadata';
import compression from 'compression';
import bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './dependencies/inversifyConfig';

// create server
const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
});

const port = ((process.env.PORT as unknown) as number) || 3000;
server.build().listen(port);

console.log(`Server started on port ${port}`);
