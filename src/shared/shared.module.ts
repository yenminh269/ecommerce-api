import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { HashingService } from './services/hashing.service';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
const sharedServices = [PrismaService, HashingService, TokenService];

@Global() //since we have global decoration, we need to have export the service
@Module({
    providers: sharedServices,
    exports: sharedServices,
    imports: [JwtModule], //import the jwtmodule so jwtservice can be used
})
export class SharedModule {}

