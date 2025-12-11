import { Injectable } from '@nestjs/common';
import {compare, hash } from 'bcrypt';

const saltRounds = 10;
@Injectable()
export class HashingService {
  hashPassword(password: string){
    return hash(password, saltRounds);
  }

  comparePassword(password:string, hash:string){
    return compare(password, hash);
  }
}
