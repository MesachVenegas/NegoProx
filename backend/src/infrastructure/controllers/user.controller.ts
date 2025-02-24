import {
  Body,
  ConflictException,
  Controller,
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
import { plainToInstance } from 'class-transformer';

import {
  UpdateUserDto,
  UpdateUserPasswordDto,
} from '../dto/user/update-user.dto';
import {
  ChangePasswordUseCase,
  CreateLocalUserUseCase,
  DisableUserUseCase,
  GetAllUsersUseCase,
  SearchUserUseCase,
  UpdateUserUseCase,
} from '@/application/user/use-cases';
import {
  PaginationDto,
  PaginationResponseDto,
} from '@/infrastructure/dto/pagination.dto';
import { Role } from '@/domain/constants/role.enum';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RoleGuard } from '@/shared/guards/role.guard';
import { Roles } from '@/shared/decorators/role.decorator';
import { ResponseUserDto } from '../dto/user/user-response.dto';
import { UserProfileAccDto } from '../dto/user/user-profile-acc.dto';
import { QuerySearchUserDto } from '../dto/user/user-query-search.dto';
import { UserPrismaRepository } from '../repositories/user.repository';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { RegisterLocalUserDto } from '../dto/user/register-local-user.dto';
import { HttpErrorResponseDto } from '@/infrastructure/dto/http-error-response.dto';

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
  constructor(private readonly userPrismaRepository: UserPrismaRepository) {}

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
    @Query() { page = 1, limit = 10, order = 'asc' }: PaginationDto,
  ): Promise<PaginationResponseDto<ResponseUserDto[]>> {
    const useCase = new GetAllUsersUseCase(this.userPrismaRepository);

    const { totalUsers, users } = await useCase.execute(page, limit, order);

    if (!users) throw new NotFoundException('Users not found');

    return {
      pages: totalUsers ? Math.ceil(totalUsers / limit) : 1,
      prev: page > 1 ? page - 1 : null,
      next: page * limit < totalUsers ? page + 1 : null,
      limit,
      data: plainToInstance(ResponseUserDto, users),
    };
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
  async getUser(@Query() query: QuerySearchUserDto) {
    const useCase = new SearchUserUseCase(this.userPrismaRepository);
    const result = await useCase.execute(query.id, query.email, query.phone);

    return plainToInstance(UserProfileAccDto, result);
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
  async registerLocalUser(
    @Body() data: RegisterLocalUserDto,
  ): Promise<ResponseUserDto> {
    const useCase = new CreateLocalUserUseCase(this.userPrismaRepository);
    const user = await useCase.execute(data);

    return plainToInstance(ResponseUserDto, user);
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
    const useCase = new UpdateUserUseCase(this.userPrismaRepository);
    const user = await useCase.execute(dto, id);

    return plainToInstance(UserProfileAccDto, user);
  }

  // --- DELETE USER ---
  @Patch('disable')
  @ApiOperation({ description: 'Disable a user account' })
  @ApiOkResponse({
    type: UserProfileAccDto,
    description: 'Data of user deleted',
  })
  async disableUser(@Query('id') id: string): Promise<UserProfileAccDto> {
    const useCase = new DisableUserUseCase(this.userPrismaRepository);
    const user = await useCase.execute(id);

    return plainToInstance(UserProfileAccDto, user);
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
    const useCase = new ChangePasswordUseCase(this.userPrismaRepository);
    const result = await useCase.execute(user.id, newPass.password);
    if (!result) throw new ConflictException('Password cannot be changed');

    return {
      message: { status: 'success', data: { message: 'Password changed' } },
    };
  }
}
