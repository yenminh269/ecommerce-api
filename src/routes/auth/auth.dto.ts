import { IsString } from "class-validator";
import { Exclude } from 'class-transformer';
export class LoginBodyDTO {
    @IsString() email: string;
    @IsString() password: string;
}

export class LoginResponseDTO {
    accessToken: string;
    refreshToken: string;

   constructor(partial: Partial<LoginResponseDTO>) {
    Object.assign(this, partial);
  }
}

export class RegisterBodyDTO extends LoginBodyDTO {
   @IsString({message: 'Name must be a string'}) name:string;
   @IsString() confirmPassword: string;
}

export class RegisterResponseDTO {
   id: number;
   name: string;
   email: string;
   createdAt: Date;
   updatedAt: Date;

   // @Expose() - return data that is not defined in the db
   // get emailName(){
   //    return `${this.name}-${this.email}`;
   // }

   @Exclude()
   password: string;

   constructor(partial: Partial<RegisterResponseDTO>) {
    Object.assign(this, partial);
  }
}
