import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  IMember,
  IUser,
  IUserInfo,
  ImageType,
} from './interfaces/member.interface';

@Injectable()
export class MemberService {
  constructor(@InjectModel('Member') private MemberModel: Model<IMember>) {}

  public async getMembers(): Promise<IMember[]> {
    try {
      const db_members = await this.MemberModel;
      const members = await db_members.find();

      if (members.length === 0) {
        return [];
      }

      return members;
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  public async createMember(member: IUser, id?: number) {
    try {
      const db_members = await this.MemberModel;
      const index = (id || (await db_members.find().countDocuments())) + 1;
      const isIDexist = await db_members.find({ id: index });

      if (isIDexist.length !== 0) this.createMember(member, id);

      const emailIsExist = await db_members.find({ email: member.email });

      if (emailIsExist.length > 0)
        throw new HttpException(
          'Email already exists!',
          HttpStatus.BAD_REQUEST,
        );

      const createMember = await db_members.create({
        id: index,
        ...member,
      });

      const result = await createMember.save();
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateMember(id: number, info: IUserInfo) {
    try {
      const db_members = await this.MemberModel;

      if (
        !!info.photo_ext &&
        !(<any>Object).values(ImageType).includes(info.photo_ext)
      ) {
        throw new HttpException(
          'Image must have a valid type. Such like .png, .jpeg, .jpg',
          HttpStatus.BAD_REQUEST,
        );
      }

      const member = await db_members.findOneAndUpdate({ id }, info, {
        new: true,
      });

      if (member)
        return { message: 'Member Updated Successfully', status: 201 };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
