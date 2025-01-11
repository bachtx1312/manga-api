import { Injectable } from '@nestjs/common';
import { EHeathStatus, IHealthCheckResponse } from './app.interface';

@Injectable()
export class AppService {
  healthCheck(): IHealthCheckResponse {
    return {
      status: EHeathStatus.OK,
    };
  }
}
