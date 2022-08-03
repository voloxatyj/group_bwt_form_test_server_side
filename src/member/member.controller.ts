import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBody,
} from '@nestjs/swagger';
import { Response } from 'express';
import { createMemberDTO, updateMemberDTO } from './dto/member.dto';
import { IUser, IUserInfo, IMember } from './interfaces/member.interface';
import { MemberService } from './member.service';

@Controller('members')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get('')
  @ApiCreatedResponse({ description: 'Get All Members' })
  @ApiBadRequestResponse({ description: 'No members data' })
  async getMembers(@Res() res: Response): Promise<IMember[] | any> {
    const response = await this.memberService.getMembers();
    res.send(response);
  }

  @Post('')
  @ApiCreatedResponse({ description: 'Create Member' })
  @ApiBadRequestResponse({ description: "Can't create member", status: 404 })
  @ApiBody({ type: createMemberDTO })
  async createMember(
    @Body() member: createMemberDTO,
    @Res() res: Response,
  ): Promise<IUser | any> {
    const response = await this.memberService.createMember(member);
    res.send(response);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'Update Member' })
  @ApiBadRequestResponse({ description: "Can't update member" })
  @ApiBody({ type: updateMemberDTO })
  async updateMember(
    @Param('id', ParseIntPipe) id: number,
    @Body() info: updateMemberDTO,
    @Res() res: Response,
  ): Promise<IUserInfo | any> {
    const response = await this.memberService.updateMember(id, info);
    res.send(response);
  }
}
