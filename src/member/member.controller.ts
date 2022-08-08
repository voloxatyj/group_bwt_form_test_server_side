import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBody,
} from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { createMemberDTO, updateMemberDTO } from './dto/member.dto';
import { IUser, IUserInfo, IMember } from './interfaces/member.interface';
import { MemberService } from './member.service';

@Controller('members')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get('')
  @ApiCreatedResponse({ description: 'Get All Members' })
  @ApiBadRequestResponse({ description: 'No members data' })
  async getMembers(@Res() res: FastifyReply): Promise<IMember[] | any> {
    const members = await this.memberService.getMembers();
    res.send({ data: members });
  }

  @Post('')
  @ApiCreatedResponse({ description: 'Create Member' })
  @ApiBadRequestResponse({ description: "Can't create member", status: 404 })
  @ApiBody({ type: createMemberDTO })
  async createMember(
    @Body() member: createMemberDTO,
    @Res() res: FastifyReply,
  ): Promise<IUser | any> {
    try {
      const response = await this.memberService.createMember(member);
      res.send(response);
    } catch (error) {
      Logger.error(error);
    }
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'Update Member' })
  @ApiBadRequestResponse({ description: "Can't update member" })
  @ApiBody({ type: updateMemberDTO })
  async updateMember(
    @Param('id', ParseIntPipe) id: number,
    @Body() info: updateMemberDTO,
    @Res() res: FastifyReply,
  ): Promise<IUserInfo | any> {
    try {
      const response = await this.memberService.updateMember(id, info);
      res.send(response);
    } catch (error) {
      Logger.error(error);
      return { error: error.cause, status: error.status };
    }
  }
}
