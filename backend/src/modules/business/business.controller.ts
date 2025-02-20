import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Public } from '@/shared/core/decorators/public.decorator';
import {
  PaginationDto,
  PaginationResponseDto,
} from '@/shared/dto/pagination.dto';
import { BusinessResponseDto } from './dto/business-response.dto';
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
import { HttpErrorResponseDto } from '@/shared/dto/http-error-response.dto';
import {
  RegisterBusinessDto,
  RegisterLocalBusinessDto,
} from './dto/register-local-business.dto';
import { CurrentUser } from '@/shared/core/decorators/current-user.decorator';
import { UserTokenVersionDto } from '../user/dto/user-token.dto';

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

  @Get(':id')
  @Public()
  @ApiOkResponse({
    description: 'Business found',
    type: BusinessResponseDto,
  })
  async findBusiness(@Param('id') id: string) {
    return await this.businessService.findBusinessById(id);
  }

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

  // Review: review whit test
  @Post('promote')
  @ApiBearerAuth()
  promoteBusinessOwner(
    @CurrentUser() user: UserTokenVersionDto,
    @Body() dto: RegisterBusinessDto,
  ) {
    return this.businessService.promoteBusinessOwner(dto, user);
  }

  // TODO: implement update a business.

  @Delete(':id')
  async deleteBusiness(
    @Param('id') id: string,
    @CurrentUser() user: UserTokenVersionDto,
  ) {
    return await this.businessService.deleteBusiness(id, user.id);
  }
}
