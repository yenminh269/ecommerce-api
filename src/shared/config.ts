import { plainToInstance } from 'class-transformer';
import  fs from 'fs';
import path from 'path';
import { IsString, validateSync, IsNumber } from 'class-validator';
import dotenv from 'dotenv';

dotenv.config();

//check if .env file exists
if(!fs.existsSync(path.resolve('.env'))){
    console.log('No .env file found, creating one...');
    process.exit(1);
}

//represent the value of the .env file
class ConfigSchema{
    @IsString() //use decorator to validate the value
    ACCESS_TOKEN_SECRET: string;
    @IsString()
    ACCESS_TOKEN_EXPIRES_IN: string;
    @IsString()
    REFRESH_TOKEN_SECRET: string;
    @IsString()
    REFRESH_TOKEN_EXPIRES_IN: string;
    @IsString()
    DATABASE_URL: string;
}
//convert process.env object to be an object instance of ConfigSchema class
const configServrer = plainToInstance(ConfigSchema, process.env, 
    { enableImplicitConversion: true });

const e = validateSync(configServrer);
if(e.length > 0){
    console.log('All the values are not valid');
    const errors = e.map(eItem => {
        return {
            property: eItem.property,
            constraints: eItem.constraints,
            value: eItem.value
        }
    })
    throw errors;
}
const envConfig = configServrer;
export default envConfig;
