import { ConfigService } from '../config/config.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IMember, IUser, IUserInfo } from './interfaces/member.interface';
import axios from 'axios';

@Injectable({})
export class MemberService {
  constructor(private readonly configService: ConfigService) {}

  public async getMembers(): Promise<IMember[]> {
    try {
      const api_url = await this.configService.getApiUrl();

      const { data } = await axios.get(`${api_url}/members`);

      return data as IMember[];
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async createMember(member: IUser) {
    try {
      const api_url = await this.configService.getApiUrl();

      const { data } = await axios.post(`${api_url}/members`, member);

      return data as IUser;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateMember(id: number, info: IUserInfo): Promise<IUserInfo> {
    try {
      const api_url = await this.configService.getApiUrl();
      let photo_hash = null;

      if (info.photo_hash) {
        photo_hash = Buffer.from(info.photo_hash, 'ascii');
      }

      const { data } = await axios.patch(`${api_url}/members/${id}`, {
        ...info,
        photo_hash,
      });

      return data as IUserInfo;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
