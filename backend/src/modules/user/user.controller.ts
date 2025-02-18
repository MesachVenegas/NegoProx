import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import {
  PaginationDto,
  PaginationResponseDto,
} from '@/shared/dto/pagination.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/user-response.dto';
import { UserProfileAccDto } from './dto/user-profile-acc.dto';
import { QuerySearchUserDto } from './dto/user-query-search.dto';
import { RegisterLocalUserDto } from './dto/register-local-user.dto';
import { HttpErrorResponseDto } from '@/shared/dto/http-error-response.dto';
import { CurrentUser } from '@/shared/common/decorators/current-user.decorator';

@Controller('user')
@UseGuards(JwtGuard)
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
              example: [
                {
                  id: 'cm78m8opx0008mvpkqqyqbtkv',
                  name: 'Dueño de Negocio',
                  lastName: 'Ejemplo',
                  email: 'negocio@negoprox.com',
                  emailVerified: true,
                  phone: '+0987654321',
                  isDisabled: false,
                  userType: 'BUSINESS',
                  registerAt: '2025-02-17T22:31:17.157Z',
                },
              ],
            },
          },
        },
      ],
    },
  })
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
  @ApiCreatedResponse({
    type: ResponseUserDto,
    description: 'Data of user created',
  })
  async registerLocalUser(@Body() data: RegisterLocalUserDto) {
    const user = await this.userService.createLocalUser(data);
    return user;
  }

  // --- UPDATE USER ---
  @Put('update')
  @ApiAcceptedResponse({
    type: UserProfileAccDto,
    description: 'Data of user updated',
  })
  async updateUser(@Body() dto: UpdateUserDto, @Query('id') id: string) {
    return await this.userService.updateUser(dto, id);
  }

  // --- DELETE USER ---
  @Delete('delete')
  @ApiAcceptedResponse({
    type: UserProfileAccDto,
    description: 'Data of user deleted',
  })
  async deleteUser(@Query('id') id: string): Promise<UserProfileAccDto> {
    return await this.userService.disable(id);
  }

  @Put('change-password')
  async changePass(
    @CurrentUser() user: UserProfileAccDto,
    @Body() newPass: UpdateUserPasswordDto,
  ) {
    await this.userService.updatePassword(user.id, newPass.password);
    return { message: 'Password changed successfully' };
  }
}
