import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(
    private _health: HealthCheckService,
    private _http: HttpHealthIndicator,
    private _database: TypeOrmHealthIndicator,
    @InjectDataSource()
    private defaultConnection: DataSource,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this._health.check([
      () => this._http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      () =>
        this._database.pingCheck('database', {
          connection: this.defaultConnection,
        }),
    ]);
  }
}
