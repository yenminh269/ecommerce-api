import { ConflictException, Injectable } from '@nestjs/common';
import { HashingService } from '../../shared/services/hashing.service';
import { PrismaService } from '../../shared/services/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private readonly hashingService: HashingService,
        private readonly prismaService: PrismaService
    ) {}
    async register(body: any) {
        try{
            const hashedPassword = await this.hashingService.hashPassword(body.password);
            const user = await this.prismaService.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                name: body.name
            }
            });
            return user;
        }catch(error){
            if(error instanceof Prisma.PrismaClientKnownRequestError
                && error.code === 'P2002'){
                throw new ConflictException('Email already exists');
            }
            console.log(error.message);
            throw error;
        }
    }
}
