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
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import {
  PaginationDto,
  PaginationResponseDto,
} from '@/shared/dto/pagination.dto';
import {
  RegisterBusinessDto,
  RegisterLocalBusinessDto,
} from './dto/register-local-business.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { BusinessService } from './business.service';
import { UserTokenVersionDto } from '../user/dto/user-token.dto';
import { BusinessResponseDto } from './dto/business-response.dto';
import { Public } from '@/shared/core/decorators/public.decorator';
import { HttpErrorResponseDto } from '@/shared/dto/http-error-response.dto';
import { CurrentUser } from '@/shared/core/decorators/current-user.decorator';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Controller('business')
@UseGuards(JwtGuard)
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

  // -- Get all business available
  @Get()
  @Public()
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
  async loadBusiness(
    @Query() query: PaginationDto,
  ): Promise<PaginationResponseDto<BusinessResponseDto[]>> {
    return await this.businessService.getAllBusiness(query);
  }

  // -- Get business by id
  @Get('find')
  @Public()
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
  promoteBusinessOwner(
    @CurrentUser() user: UserTokenVersionDto,
    @Body() dto: RegisterBusinessDto,
  ) {
    return this.businessService.promoteBusinessOwner(dto, user);
  }

  @Put('update')
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
  async deleteBusiness(
    @Query('id') id: string,
    @CurrentUser() user: UserTokenVersionDto,
  ) {
    return await this.businessService.deleteBusiness(id, user.id);
  }
}
