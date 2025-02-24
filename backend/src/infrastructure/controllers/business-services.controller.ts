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
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Role } from '@/domain/constants/role.enum';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RoleGuard } from '@/shared/guards/role.guard';
import { Roles } from '@/shared/decorators/role.decorator';
import { Public } from '@/shared/decorators/public.decorator';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { HttpErrorResponseDto } from '@/infrastructure/dto/http-error-response.dto';
import { BusinessServicesResponseDto } from '../dto/business-service/services-response.dto';
import { BusinessServicesService } from '@/application/business-services/business-services.service';
import { CreateServiceDto } from '../dto/business-service/create-service.dto';
import { UserTokenVersionDto } from '../dto/user/user-token.dto';

@Controller('services')
@ApiTags('Business Services')
@UseGuards(JwtGuard, RoleGuard)
@ApiBadRequestResponse({
  description: 'Bad Request',
  type: HttpErrorResponseDto,
})
@ApiNotFoundResponse({
  description: 'Service not found or disabled',
  type: HttpErrorResponseDto,
})
export class BusinessServicesController {
  constructor(private readonly service: BusinessServicesService) {}

  @Get()
  @Public()
  @ApiOkResponse({ type: [BusinessServicesResponseDto] })
  @ApiOperation({
    description: 'Find all services whit business relation without auth',
  })
  async findAll() {
    return await this.service.getAllServices();
  }

  @Get('find')
  @Public()
  @ApiOperation({
    description: 'Find a service whit business relation without auth',
  })
  @ApiOkResponse({ type: BusinessServicesResponseDto })
  async find(@Query('id') id: string) {
    return await this.service.getServiceById(id);
  }

  @Post('create')
  @ApiBearerAuth()
  @Roles(Role.BUSINESS)
  @ApiOperation({ description: 'Only business owner can create a service' })
  @ApiOkResponse({ type: BusinessServicesResponseDto })
  @ApiForbiddenResponse({ description: 'User is not business owner or admin' })
  async create(@Query('id') id: string, @Body() dto: CreateServiceDto) {
    return await this.service.saveService(dto, id);
  }

  @Put('update')
  @ApiBearerAuth()
  @Roles(Role.BUSINESS)
  @ApiOperation({
    description:
      'Only business owner can update, this method take body info to update service',
  })
  @ApiOkResponse({ type: BusinessServicesResponseDto })
  @ApiForbiddenResponse({ description: 'User is not business owner or admin' })
  async update(
    @Query('id') id: string,
    @Body() dto: Partial<CreateServiceDto>,
    @CurrentUser() user: UserTokenVersionDto,
  ) {
    return await this.service.updateService(user.id, id, dto);
  }

  @Put('disable')
  @ApiBearerAuth()
  @Roles(Role.BUSINESS)
  @ApiOperation({
    description:
      'Only business owner can disable, this action marks the service as disabled and cannot saw by users',
  })
  @ApiOkResponse({ type: BusinessServicesResponseDto })
  @ApiForbiddenResponse({ description: 'User is not business owner or admin' })
  async disable(
    @Query('id') id: string,
    @CurrentUser() user: UserTokenVersionDto,
  ) {
    return await this.service.disableService(id, user.id);
  }

  @Delete('delete')
  @ApiBearerAuth()
  @Roles(Role.BUSINESS)
  @ApiOperation({
    description: 'Only business owner can delete, this action is irreversible',
  })
  @ApiOkResponse({ type: BusinessServicesResponseDto })
  @ApiForbiddenResponse({ description: 'User is not business owner or admin' })
  async delete(
    @Query('id') id: string,
    @CurrentUser() user: UserTokenVersionDto,
  ) {
    return await this.service.deleteService(user.id, id);
  }
}
