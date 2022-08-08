import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountrySchema } from './schemas/country.model';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Country', schema: CountrySchema }]),
  ],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
