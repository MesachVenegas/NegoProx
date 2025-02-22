import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ResponseUserDto } from './dto/user-response.dto';
import { UserProfileAccDto } from './dto/user-profile-acc.dto';
import { QuerySearchUserDto } from './dto/user-query-search.dto';
import { RegisterLocalUserDto } from './dto/register-local-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';

import {
  PaginationDto,
  PaginationResponseDto,
} from '@/shared/dto/pagination.dto';
import { Role } from '@/shared/constants/role.enum';
import { RoleGuard } from '@/shared/core/guards/role.guard';
import { Roles } from '@/shared/core/decorators/role.decorator';
import { HttpErrorResponseDto } from '@/shared/dto/http-error-response.dto';
import { CurrentUser } from '@/shared/core/decorators/current-user.decorator';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtGuard, RoleGuard)
@ApiBearerAuth()
@ApiBadRequestResponse({
  type: HttpErrorResponseDto,
  description: 'Bad request',
})
@ApiNotFoundResponse({
  type: HttpErrorResponseDto,
  description: 'User not found',
})
@ApiUnauthorizedResponse({
  type: HttpErrorResponseDto,
  description: 'User not authorized',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  // --- GET ALL USERS ---
  @Get()
  @ApiOperation({
    description: 'Get a list of users',
  })
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
  @ApiForbiddenResponse({
    type: HttpErrorResponseDto,
    description: 'User level no have necessary permissions',
  })
  @Roles(Role.ADMIN)
  async getAllUsers(
    @Query() query: PaginationDto,
  ): Promise<PaginationResponseDto<ResponseUserDto[]>> {
    const users = await this.userService.loadAllUsers(query);
    if (!users) throw new NotFoundException('No users found');
    return users;
  }

  // --- FIND USER ---
  @Get('find')
  @ApiOperation({
    description: 'Retrieve user by email or name or ID, with account data',
  })
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
  @ApiCreatedResponse({
    type: ResponseUserDto,
    description: 'Data of user created',
  })
  @ApiForbiddenResponse({
    type: HttpErrorResponseDto,
    description: 'User level no have necessary permissions',
  })
  @ApiOperation({
    description: 'Crete a new local user',
  })
  @Roles(Role.ADMIN)
  async registerLocalUser(@Body() data: RegisterLocalUserDto) {
    const user = await this.userService.createLocalUser(data);
    return user;
  }

  // --- UPDATE USER ---
  @Put('update')
  @ApiOperation({
    description:
      'Update user data example, name, lastName, profilePic, except password',
  })
  @ApiAcceptedResponse({
    type: UserProfileAccDto,
    description: 'Data of user updated',
  })
  async updateUser(@Body() dto: UpdateUserDto, @Query('id') id: string) {
    return await this.userService.updateUser(dto, id);
  }

  // --- DELETE USER ---
  @Delete('delete')
  @ApiOperation({ description: 'Disable a user account' })
  @ApiOkResponse({
    type: UserProfileAccDto,
    description: 'Data of user deleted',
  })
  async deleteUser(@Query('id') id: string): Promise<UserProfileAccDto> {
    return await this.userService.disable(id);
  }

  @Patch('change-password')
  @ApiOperation({ description: 'Allow user authenticated to change password' })
  @ApiOkResponse({
    example: {
      message: {
        status: 'success',
        timestamp: '2025-02-18T00:17:10.840Z',
        data: {
          message: 'Password changed successfully',
        },
      },
    },
  })
  async changePass(
    @CurrentUser() user: UserProfileAccDto,
    @Body() newPass: UpdateUserPasswordDto,
  ) {
    await this.userService.updatePassword(user.id, newPass.password);
    return { message: 'Password changed successfully' };
  }
}
