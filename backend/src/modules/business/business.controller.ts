import {
  Body,
  Controller,
  Delete,
  Get,
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
} from './dto/register-local-business.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { BusinessService } from './business.service';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { SearchBusinessDto } from './dto/search-business.dto';
import { UserTokenVersionDto } from '../user/dto/user-token.dto';
import { BusinessResponseDto } from './dto/business-response.dto';

import { RoleGuard } from '@/shared/core/guards/role.guard';
import { Public } from '@/shared/core/decorators/public.decorator';
import { PaginationResponseDto } from '@/shared/dto/pagination.dto';
import { HttpErrorResponseDto } from '@/shared/dto/http-error-response.dto';
import { CurrentUser } from '@/shared/core/decorators/current-user.decorator';
import { Roles } from '@/shared/core/decorators/role.decorator';
import { Role } from '@/shared/constants/role.enum';

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
  constructor(private readonly businessService: BusinessService) {}

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
    return await this.businessService.searchBusiness(query);
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
    return await this.businessService.findBusinessById(id);
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
    return await this.businessService.createLocalBusiness(dto);
  }

  // -- Promote a existing user as business owner
  // Review: review whit test
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
    return this.businessService.promoteBusinessOwner(dto, user);
  }

  @Put('update')
  @ApiBearerAuth()
  @Roles(Role.BUSINESS)
  @ApiOperation({ description: 'Update a business by id, if is the owner' })
  @ApiOkResponse({
    type: BusinessResponseDto,
  })
  updateBusiness(
    @Query('id') id: string,
    @Body() dto: UpdateBusinessDto,
    @CurrentUser() user: UserTokenVersionDto,
  ) {
    return this.businessService.updateBusiness(user.id, id, dto);
  }

  // -- Delete a business by id
  @Delete('delete')
  @ApiBearerAuth()
  @Roles(Role.BUSINESS)
  @ApiOperation({ description: 'Disable a business account' })
  @ApiOkResponse({
    type: BusinessResponseDto,
  })
  async deleteBusiness(
    @Query('id') id: string,
    @CurrentUser() user: UserTokenVersionDto,
  ) {
    return await this.businessService.deleteBusiness(id, user.id);
  }
}
