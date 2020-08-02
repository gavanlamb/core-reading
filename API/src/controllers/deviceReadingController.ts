import Logger from '../utilities/logger';
import { Request, Response } from 'express';
import { MessageRequestBody, ReadingMessage } from '../models/dto';
import { IReadingService } from '../services/iReadingService';
import { inject } from 'inversify';
import { TYPES } from '../dependencies/types';
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  request,
  response,
  requestParam,
} from 'inversify-express-utils';

@controller('/api/v1/device')
export class DeviceReadingController implements interfaces.Controller {
  private readonly readingService: IReadingService;
  constructor(@inject(TYPES.ReadingService) readingService: IReadingService) {
    this.readingService = readingService;
  }

  @httpPost('/reading')
  public async saveReading(
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    const body = req.body as MessageRequestBody;

    const buffer = Buffer.from(body.message.data, 'base64');
    const message = JSON.parse(buffer.toString()) as ReadingMessage;
    await this.readingService.saveDeviceReading(message);

    res.status(200);
    res.send();
  }

  @httpGet('/:deviceId/reading')
  public async getReadingsForDevice(
    @requestParam('deviceId') deviceId: string,
    @requestParam('timePeriod') timePeriod: string,
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    Logger.info(req.body);
    await this.readingService.getDeviceReadings(deviceId, timePeriod as string);

    res.status(200);
    res.send();
  }
}
