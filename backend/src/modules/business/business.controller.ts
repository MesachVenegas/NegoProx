import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Public } from '@/shared/core/decorators/public.decorator';
import {
  PaginationDto,
  PaginationResponseDto,
} from '@/shared/dto/pagination.dto';
import { BusinessResponseDto } from './dto/business-response.dto';
// import { BusinessProfileDto } from './dto/business-profile.dto';

@Controller('business')
@UseGuards(JwtGuard)
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get()
  @Public()
  async loadBusiness(
    @Query() query: PaginationDto,
  ): Promise<PaginationResponseDto<BusinessResponseDto[]>> {
    return await this.businessService.getAllBusiness(query);
  }

  @Get(':id')
  @Public()
  async findBusiness(@Param('id') id: string) {
    return await this.businessService.findBusinessById(id);
  }
  // TODO: implemente create a new business.
  // TODO: implement promote user a business owner.
  // TODO: implement update a business.
  // TODO: implement delete a business.
}
