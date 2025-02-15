import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterLocalUserDto } from './dto/register-local-user.dto';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { ResponseUserDto } from './dto/user-response.dto';
import { HttpErrorResponseDto } from '@/shared/dto/http-error-response.dto';
import { UserProfileAccDto } from './dto/user-profile-acc.dto';
import { QuerySearchUserDto } from './dto/user-query-search.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from '@/shared/dto/pagination.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Get('find')
  @ApiOkResponse({
    description: 'Data of user found',
    type: UserProfileAccDto,
  })
  async getUser(
    @Query() query: QuerySearchUserDto,
  ): Promise<UserProfileAccDto> {
    const user = await this.userService.findUserByQuery(query);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Data of user created',
    type: User,
  })
  async registerLocalUser(@Body() data: RegisterLocalUserDto) {
    const user = await this.userService.createLocalUser(data);
    return user;
  }
}
