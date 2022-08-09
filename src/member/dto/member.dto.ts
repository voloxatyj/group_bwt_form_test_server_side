import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsString,
  IsOptional,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { ImageType } from '../interfaces/member.interface';

export class createMemberDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'firstname' })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'lastname' })
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty({ type: String, description: 'birthdate' })
  birthdate: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty({ type: String, description: 'report_subject' })
  report_subject: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(17)
  @ApiProperty({ type: String, description: 'phone' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(6)
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'country_id' })
  country_id: number;
}

export class updateMemberDTO {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  @ApiProperty({ type: String, description: 'aboutMe' })
  aboutMe: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  @ApiProperty({ type: String, description: 'company' })
  company: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  @ApiProperty({ type: String, description: 'position' })
  position: string;

  @IsString()
  @MinLength(10)
  @IsOptional()
  @ApiProperty({ type: String, description: 'photo_url' })
  photo_url: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'photo_hash' })
  photo_hash: string;

  @IsString()
  @IsOptional()
  @IsEnum(ImageType)
  @ApiProperty({ type: String, description: 'photo_ext' })
  photo_ext: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'photo' })
  photo: string;
}
