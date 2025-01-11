declare namespace Express {
  type User = Omit<import('@/database/entites/user.entity').User, 'password'>;
}
