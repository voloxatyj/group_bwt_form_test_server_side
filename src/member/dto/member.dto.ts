import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  Min,
  Max,
  IsInt,
  IsString,
  IsOptional,
} from 'class-validator';

export class createMemberDTO {
  @IsString()
  @Min(3)
  @Max(10)
  @ApiProperty({ type: String, description: 'firstname' })
  firstname: string;

  @IsString()
  @Min(3)
  @Max(10)
  @ApiProperty({ type: String, description: 'lastname' })
  lastname: string;

  @IsString()
  @Min(10)
  @ApiProperty({ type: String, description: 'birthdate' })
  birthdate: string;

  @IsString()
  @Min(5)
  @Max(100)
  @ApiProperty({ type: String, description: 'report_subject' })
  report_subject: string;

  @IsString()
  @Min(17)
  @ApiProperty({ type: String, description: 'phone' })
  phone: string;

  @IsString()
  @IsEmail()
  @Min(6)
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsInt()
  @ApiProperty({ type: Number, description: 'country_id' })
  country_id: number;
}

export class updateMemberDTO {
  @IsString()
  @Max(100)
  @IsOptional()
  @ApiProperty({ type: String, description: 'aboutMe' })
  aboutMe: string;

  @IsString()
  @Max(100)
  @IsOptional()
  @ApiProperty({ type: String, description: 'company' })
  company: string;

  @IsString()
  @Max(20)
  @IsOptional()
  @ApiProperty({ type: String, description: 'position' })
  position: string;

  @IsString()
  @Max(20)
  @IsOptional()
  @ApiProperty({ type: String, description: 'photo_url' })
  photo_url: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'photo_hash' })
  photo_hash: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'photo_ext' })
  photo_ext: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'photo' })
  photo: string;
}
