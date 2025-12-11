
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const url = process.env.DATABASE_URL || 'dev.db'; //use value in .env only when prisma is loaded at runtime
    const adapter = new PrismaBetterSqlite3({ url });
    super({ adapter });
  }
}
