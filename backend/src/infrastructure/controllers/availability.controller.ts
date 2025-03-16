import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { UserTokenVersionDto } from '../dto/user';
import { Role } from '@/domain/constants/role.enum';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CsrfGuard } from '@/shared/guards/csrf.guard';
import { RoleGuard } from '@/shared/guards/role.guard';
import { Roles } from '@/shared/decorators/role.decorator';
import { AvailabilityResponseDto } from '../dto/availability';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { BusinessPrismaRepository } from '../repositories/business.repository';
import { UpdateAvailabilityDto } from '../dto/availability/update-availability';
import { AvailabilityPrismaRepository } from '../repositories/availability.repository';
import { ValidateCreationAvailabilityDto } from '../dto/availability/validate-creation';
import { CreateAvailabilityUseCase } from '@/application/availability/use-cases/create-availability';
import { GetBusinessAvailabilityUseCase } from '@/application/availability/use-cases/get-business-availability';
import { UpdateAvailabilityUseCase } from '@/application/availability/use-cases/update-availability';

@ApiTags('Availability')
@Controller('availability')
@UseGuards(JwtGuard, RoleGuard, CsrfGuard)
export class AvailabilityController {
  constructor(
    private readonly businessRepository: BusinessPrismaRepository,
    private readonly availabilityRepository: AvailabilityPrismaRepository,
  ) {}

  @Get('get')
  async getAvailability(@Query('businessId') id: string) {
    const getAvailability = new GetBusinessAvailabilityUseCase(
      this.availabilityRepository,
    );
    const availability = await getAvailability.execute(id);

    return plainToInstance(AvailabilityResponseDto, availability);
  }

  // TODO: fix this to cannot create availability if day is duplicate and if not are linkend to service
  @Post('create')
  @Roles(Role.USER, Role.ADMIN)
  async createAvailability(
    @Body() { data }: ValidateCreationAvailabilityDto,
    @CurrentUser() user: UserTokenVersionDto,
    @Query('businessId') businessId: string,
  ) {
    if (!data || data.length === 0)
      throw new BadRequestException('No data was provided');
    const Create = new CreateAvailabilityUseCase(
      this.availabilityRepository,
      this.businessRepository,
    );
    const availability = await Create.execute({
      userId: user.id,
      role: user.userType as Role,
      businessId,
      data,
    });

    return plainToInstance(AvailabilityResponseDto, availability);
  }

  @Put('update/:id')
  @Roles(Role.USER, Role.ADMIN)
  async updateAvailability(
    @CurrentUser() user: UserTokenVersionDto,
    @Param('id') id: string,
    @Body() data: UpdateAvailabilityDto,
  ) {
    if (!data || Object.keys(data).length === 0)
      throw new BadRequestException('No data was provided');
    const Update = new UpdateAvailabilityUseCase(this.availabilityRepository);
    const result = await Update.execute({
      userId: user.id,
      role: user.userType as Role,
      availabilityId: id,
      data,
    });

    return result;
  }
}
