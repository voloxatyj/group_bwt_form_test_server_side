import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsString,
  IsOptional,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

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
  @IsOptional()
  @ApiProperty({ type: String, description: 'aboutMe' })
  aboutMe: string;

  @IsOptional()
  @ApiProperty({ type: String, description: 'company' })
  company: string;

  @IsOptional()
  @ApiProperty({ type: String, description: 'position' })
  position: string;

  @IsOptional()
  @ApiProperty({ type: String, description: 'photo_url' })
  photo_url: string;

  @IsOptional()
  @ApiProperty({ type: String, description: 'photo_hash' })
  photo_hash: string;

  @IsOptional()
  @ApiProperty({ type: String, description: 'photo_ext' })
  photo_ext: string;

  @IsOptional()
  @ApiProperty({ type: String, description: 'photo' })
  photo: string;
}
