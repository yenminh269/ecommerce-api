import { ConflictException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { HashingService } from '../../shared/services/hashing.service';
import { PrismaService } from '../../shared/services/prisma.service';
import { Prisma } from '@prisma/client';
import { LoginBodyDTO } from './auth.dto';
import { TokenService } from '../../shared/services/token.service';

@Injectable()
export class AuthService {
    constructor(private readonly hashingService: HashingService,
        private readonly prismaService: PrismaService,
        private readonly tokenService: TokenService,
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

    async login(body: LoginBodyDTO) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: body.email
            }
        });

        if(!user){
            throw new UnauthorizedException('Email is not valid');
        }
        const isPasswordMatch = await this.hashingService.comparePassword(body.password, user.password);
        if(!isPasswordMatch){
            throw new UnprocessableEntityException([
                {
                    field: 'password',
                    error: 'Password is incorrect'
                }
            ]); //422 status code
        }
        const tokens = await this.generateTokens({userId: user.id});
        return tokens;
    }

    async generateTokens(payload: {userId:number}){
        const tokenId = uuidv4();
        const payloadWithTokenId = {...payload, tokenId};
        const [accessToken, refreshToken] = await Promise.all([
            this.tokenService.signAccessToken(payloadWithTokenId),
            this.tokenService.signRefreshToken(payloadWithTokenId)
        ]);
        const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken);
        await this.prismaService.refreshToken.create({
            data: {
                userId: payload.userId,
                token: refreshToken,
                expiresAt: new Date(decodedRefreshToken.exp * 1000)
            }
        });
        return {accessToken, refreshToken};
    }
}
