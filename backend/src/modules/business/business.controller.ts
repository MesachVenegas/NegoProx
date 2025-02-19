import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
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
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { HttpErrorResponseDto } from '@/shared/dto/http-error-response.dto';
// import { BusinessProfileDto } from './dto/business-profile.dto';

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
  // TODO: implemente create a new business.
  // TODO: implement promote user a business owner.
  // TODO: implement update a business.
  // TODO: implement delete a business.
}
