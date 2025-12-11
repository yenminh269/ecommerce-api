import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { HashingService } from './services/hashing.service';

const sharedServices = [PrismaService, HashingService];

@Global() //since we have global decoration, we need to have export the service
@Module({
    providers: sharedServices,
    exports: sharedServices,
})
export class SharedModule {}

