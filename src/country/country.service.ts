import { ConfigService } from '../config/config.service';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICountry } from './interfaces/country.interface';
import axios from 'axios';

@Injectable({})
export class CountryService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel('Country') private CountryModel: Model<ICountry>,
  ) {}

  public async getCountries(): Promise<ICountry[]> {
    try {
      const api_url = await this.configService.getApiUrl();
      const countries = await this.CountryModel.find();

      if (countries.length === 0) {
        const {
          data: { countries },
        } = await axios.get(`${api_url}/countries`);
        this.CountryModel.insertMany(countries);
      }

      return countries as ICountry[];
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
