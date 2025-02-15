import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  PaginationDto,
  PaginationResponseDto,
} from '@/shared/dto/pagination.dto';
import { ResponseUserDto } from './dto/user-response.dto';
import { UserProfileAccDto } from './dto/user-profile-acc.dto';
import { QuerySearchUserDto } from './dto/user-query-search.dto';
import { RegisterLocalUserDto } from './dto/register-local-user.dto';
import { HttpErrorResponseDto } from '@/shared/dto/http-error-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // --- GET ALL USERS ---
  @Get()
  @ApiExtraModels(PaginationResponseDto, ResponseUserDto)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginationResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(ResponseUserDto) },
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({ type: HttpErrorResponseDto })
  @ApiNotFoundResponse({ type: HttpErrorResponseDto })
  async getAllUsers(
    @Query() query: PaginationDto,
  ): Promise<PaginationResponseDto<ResponseUserDto[]>> {
    const users = await this.userService.loadAllUsers(query);
    if (!users) throw new NotFoundException('No users found');
    return users;
  }

  // --- FIND USER ---
  @Get('find')
  @ApiOkResponse({
    description: 'Data of user found',
    type: UserProfileAccDto,
  })
  async getUser(
    @Query() query: QuerySearchUserDto,
  ): Promise<UserProfileAccDto> {
    const user = await this.userService.findUserByQuery(query);
    return user;
  }

  // --- CREATE LOCAL USER ---
  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Data of user created',
    type: ResponseUserDto,
  })
  @ApiBadRequestResponse({
    type: HttpErrorResponseDto,
    description: 'Request to body invalid data',
  })
  async registerLocalUser(@Body() data: RegisterLocalUserDto) {
    const user = await this.userService.createLocalUser(data);
    return user;
  }

  // --- UPDATE USER ---
  @Put('update')
  @ApiOkResponse({
    type: UserProfileAccDto,
    description: 'Data of user updated',
  })
  @ApiBadRequestResponse({
    type: HttpErrorResponseDto,
    description: 'Request to body invalid data',
  })
  @ApiForbiddenResponse({
    type: HttpErrorResponseDto,
    description: 'Security token invalid',
  })
  @ApiUnauthorizedResponse({
    type: HttpErrorResponseDto,
    description: 'User not authorized',
  })
  async updateUser(@Body() dto: UpdateUserDto, @Query('id') id: string) {
    return await this.userService.updateUser(dto, id);
  }

  @Delete('delete')
  @ApiOkResponse({
    type: UserProfileAccDto,
    description: 'Data of user deleted',
  })
  @ApiForbiddenResponse({
    type: HttpErrorResponseDto,
    description: 'Security token invalid',
  })
  @ApiUnauthorizedResponse({
    type: HttpErrorResponseDto,
    description: 'User not authorized',
  })
  async deleteUser(@Query('id') id: string): Promise<UserProfileAccDto> {
    return await this.userService.disable(id);
  }
  // TODO: CHANGE PASSWORD
}
