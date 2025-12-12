import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import envConfig   from '../config';
import { TokenPayload } from '../types/jwt.type';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    signAccessToken(payload: {userId: number, tokenId?: string}){
        const tokenId = payload.tokenId || uuidv4();
        return this.jwtService.sign({...payload, tokenId}, {
            secret: envConfig.ACCESS_TOKEN_SECRET,
            expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN as any,
            algorithm: 'HS256'
        });
    }

    signRefreshToken(payload: {userId: number, tokenId?: string}){
          const tokenId = payload.tokenId || uuidv4();
          return this.jwtService.sign({...payload, tokenId}, {
            secret: envConfig.REFRESH_TOKEN_SECRET,
            expiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN as any,
            algorithm: 'HS256'
        });
    }

    verifyAccessToken(token: string): Promise<TokenPayload>{
        return this.jwtService.verifyAsync(token, {
            secret: envConfig.ACCESS_TOKEN_SECRET
        })
    }

    verifyRefreshToken(token: string): Promise<TokenPayload>{
        return this.jwtService.verifyAsync(token, {
            secret: envConfig.REFRESH_TOKEN_SECRET
        })
    }
}
