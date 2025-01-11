// export interface App {}

export enum EHeathStatus {
  OK = 'OK',
  DEGRADED = 'DEGRADED',
  ERROR = 'ERROR',
}
export interface IHealthCheckResponse {
  status: EHeathStatus;
}
