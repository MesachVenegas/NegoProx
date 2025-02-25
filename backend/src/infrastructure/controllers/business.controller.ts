import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import {
  RegisterBusinessDto,
  RegisterLocalBusinessDto,
} from '../dto/business/register-local-business.dto';
import { Role } from '@/domain/constants/role.enum';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RoleGuard } from '@/shared/guards/role.guard';
import { Roles } from '@/shared/decorators/role.decorator';
import { Public } from '@/shared/decorators/public.decorator';
import { UserTokenVersionDto } from '../dto/user/user-token.dto';
import { UpdateBusinessDto } from '../dto/business/update-business.dto';
import { SearchBusinessDto } from '../dto/business/search-business.dto';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { PaginationResponseDto } from '@/infrastructure/dto/pagination.dto';
import { BusinessResponseDto } from '../dto/business/business-response.dto';
import { BusinessPrismaRepository } from '../repositories/business.repository';
import { HttpErrorResponseDto } from '@/infrastructure/dto/http-error-response.dto';
import {
  CreateBusinessUseCase,
  FilterBusinessByUserByCategoryNameUseCase,
  GetBusinessByIdUseCase,
  LogicDeleteBusinessUseCase,
  PromoteUserToBusinessUseCase,
  UpdateBusinessUseCase,
} from '@/application/business/use-cases';
import { plainToInstance } from 'class-transformer';
import { UserPrismaRepository } from '../repositories/user.repository';

@ApiTags('Business')
@Controller('business')
@UseGuards(JwtGuard, RoleGuard)
@ApiNotFoundResponse({
  description: 'Business not found',
  type: HttpErrorResponseDto,
})
@ApiUnauthorizedResponse({
  description: 'Unauthorized required session',
  type: HttpErrorResponseDto,
})
@ApiBadRequestResponse({
  description: 'Bad request error',
  type: HttpErrorResponseDto,
})
@ApiExtraModels(PaginationResponseDto, BusinessResponseDto)
export class BusinessController {
  constructor(
    private readonly BusinessRepository: BusinessPrismaRepository,
    private readonly UserRepository: UserPrismaRepository,
  ) {}

  // -- Search business by name or category, if params are empty returns all
  @Get()
  @Public()
  @ApiOperation({
    description:
      'Search business by name or category if params are empty returns all',
  })
  @ApiOkResponse({
    description: 'List of businesses available',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginationResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(BusinessResponseDto) },
            },
          },
        },
      ],
    },
  })
  async searchBusiness(@Query() query: SearchBusinessDto) {
    const FilterBusiness = new FilterBusinessByUserByCategoryNameUseCase(
      this.BusinessRepository,
    );
    const result = await FilterBusiness.execute(query);

    return result;
  }

  // -- Get business by id
  @Get('find')
  @Public()
  @ApiOperation({ description: 'Retrieve business by id' })
  @ApiOkResponse({
    description: 'Business found',
    type: BusinessResponseDto,
  })
  async findBusiness(@Query('id') id: string) {
    const GetBusiness = new GetBusinessByIdUseCase(this.BusinessRepository);
    const result = await GetBusiness.execute(id);

    return result;
  }

  // -- Create a new business
  @Post('register')
  @Public()
  @ApiOperation({ description: 'Create a new business' })
  @ApiCreatedResponse({
    description: 'Business created',
    type: BusinessResponseDto,
  })
  async createBusiness(
    @Body() dto: RegisterLocalBusinessDto,
  ): Promise<BusinessResponseDto> {
    const CreateBusiness = new CreateBusinessUseCase(this.BusinessRepository);
    const result = await CreateBusiness.execute(dto);

    return plainToInstance(BusinessResponseDto, result);
  }

  // -- Promote a existing user as business owner
  @Post('promote')
  @ApiBearerAuth()
  @Roles(Role.USER)
  @ApiOperation({ description: 'Promote a existing user as business owner' })
  @ApiOkResponse({
    type: BusinessResponseDto,
  })
  promoteBusinessOwner(
    @CurrentUser() user: UserTokenVersionDto,
    @Body() dto: RegisterBusinessDto,
  ) {
    const PromoteUser = new PromoteUserToBusinessUseCase(
      this.BusinessRepository,
    );
    const result = PromoteUser.execute({ user, dto });

    return plainToInstance(BusinessResponseDto, result);
  }

  @Put('update')
  @ApiBearerAuth()
  @Roles(Role.BUSINESS, Role.ADMIN)
  @ApiOperation({ description: 'Update a business by id, if is the owner' })
  @ApiOkResponse({
    type: BusinessResponseDto,
  })
  updateBusiness(
    @Query('id') id: string,
    @Body() dto: UpdateBusinessDto,
    @CurrentUser() user: UserTokenVersionDto,
  ) {
    const UpdateBusiness = new UpdateBusinessUseCase(this.BusinessRepository);
    const result = UpdateBusiness.execute({
      businessId: id,
      userId: user.id,
      dto,
      role: user.userType as Role,
    });

    return plainToInstance(BusinessResponseDto, result);
  }

  // -- Delete a business by id
  @Delete('delete')
  @ApiBearerAuth()
  @Roles(Role.BUSINESS, Role.ADMIN)
  @ApiOperation({ description: 'Disable a business account' })
  @ApiOkResponse({
    type: BusinessResponseDto,
  })
  async deleteBusiness(
    @Query('id') id: string,
    @CurrentUser() user: UserTokenVersionDto,
  ) {
    const DeleteBusiness = new LogicDeleteBusinessUseCase(
      this.BusinessRepository,
      this.UserRepository,
    );
    const result = await DeleteBusiness.execute({
      id,
      userId: user.id,
      userType: user.userType as Role,
    });

    if (!result) throw new NotAcceptableException('Business cannot be deleted');

    return plainToInstance(BusinessResponseDto, result);
  }
}
