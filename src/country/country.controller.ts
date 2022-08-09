import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { Logger } from '@nestjs/common';
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
    try {
      const countries = await this.countryService.getCountries();
      res.send({ countries });
    } catch (error) {
      res.send(error);
      Logger.error(error);
    }
  }
}
