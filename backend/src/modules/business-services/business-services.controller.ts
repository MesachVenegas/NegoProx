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

import { JwtGuard } from '../auth/guards/jwt.guard';
import { Role } from '@/shared/constants/role.enum';
import { CreateServiceDto } from './dto/create-service.dto';
import { RoleGuard } from '@/shared/core/guards/role.guard';
import { UserTokenVersionDto } from '../user/dto/user-token.dto';
import { Roles } from '@/shared/core/decorators/role.decorator';
import { BusinessServicesService } from './business-services.service';
import { CurrentUser } from '@/shared/core/decorators/current-user.decorator';

@Controller('services')
@UseGuards(JwtGuard, RoleGuard)
@Roles(Role.BUSINESS, Role.ADMIN)
export class BusinessServicesController {
  constructor(private readonly service: BusinessServicesService) {}

  @Get()
  async findAll() {
    return await this.service.getAllServices();
  }

  @Get('find')
  async find(@Query('id') id: string) {
    return await this.service.getServiceById(id);
  }

  @Post('create')
  async create(@Query('id') id: string, @Body() dto: CreateServiceDto) {
    return await this.service.saveService(dto, id);
  }

  @Put('update')
  async update(
    @Query('id') id: string,
    @Body() dto: Partial<CreateServiceDto>,
    @CurrentUser() user: UserTokenVersionDto,
  ) {
    return await this.service.updateService(user.id, id, dto);
  }

  @Put('disable')
  async disable(
    @Query('id') id: string,
    @CurrentUser() user: UserTokenVersionDto,
  ) {
    return await this.service.disableService(id, user.id);
  }

  @Delete('delete')
  async delete(
    @Query('id') id: string,
    @CurrentUser() user: UserTokenVersionDto,
  ) {
    return await this.service.deleteService(user.id, id);
  }
}
