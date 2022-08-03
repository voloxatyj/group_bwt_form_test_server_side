import { ConfigService } from '../config/config.service';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { ICountry } from './dto/country.dto';
import axios from 'axios';

@Injectable({})
export class CountryService {
  constructor(private readonly configService: ConfigService) {}

  public async getCountries(): Promise<ICountry[]> {
    try {
      const api_url = await this.configService.getApiUrl();

      const { data } = await axios.get(`${api_url}/countries`);

      return data as ICountry[];
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
