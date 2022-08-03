import {
  Controller,
  Get,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ICountry } from './dto/country.dto';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get('/')
  @ApiCreatedResponse({ description: 'Get All Countries' })
  @ApiBadRequestResponse({ description: "Can't get data of countries" })
  async getMembers(@Res() res: Response): Promise<ICountry[] | any> {
    const countries = await this.countryService.getCountries();

    if (countries.length !== 0) {
      res.send(countries);
    } else {
      throw new HttpException(
        "We don't get any countries",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
