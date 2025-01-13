export abstract class BaseViewModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  constructor({ id, createdAt, updatedAt, deletedAt }: BaseViewModel) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
