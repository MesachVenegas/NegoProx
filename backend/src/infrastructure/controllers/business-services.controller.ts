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
import { UserTokenVersionDto } from '../dto/user/user-token.dto';
import { CreateServiceDto } from '../dto/business/create-service.dto';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { BusinessPrismaRepository } from '../repositories/business.repository';
import { HttpErrorResponseDto } from '@/infrastructure/dto/http-error-response.dto';
import { BusinessServicesResponseDto } from '../dto/business/services-response.dto';
import { BusinessServicesPrismaRepository } from '../repositories/business-service.repository';
import {
  CreateServiceUseCase,
  DeleteServiceUseCase,
  DisableServiceUseCase,
  GetAllServicesUseCase,
  GetServiceByIdUseCase,
  UpdateServiceUseCase,
} from '@/application/business-services/use-cases';
import { plainToInstance } from 'class-transformer';

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
  constructor(
    private readonly serviceRepository: BusinessServicesPrismaRepository,
    private readonly businessRepository: BusinessPrismaRepository,
  ) {}

  @Get()
  @Public()
  @ApiOkResponse({ type: [BusinessServicesResponseDto] })
  @ApiOperation({
    description: 'Find all services whit business relation without auth',
  })
  async findAll() {
    const GetServices = new GetAllServicesUseCase(this.serviceRepository);
    const services = await GetServices.execute();

    return plainToInstance(BusinessServicesResponseDto, services);
  }

  @Get('find')
  @Public()
  @ApiOperation({
    description: 'Find a service whit business relation without auth',
  })
  @ApiOkResponse({ type: BusinessServicesResponseDto })
  async find(@Query('id') id: string) {
    const GetService = new GetServiceByIdUseCase(this.serviceRepository);
    const service = await GetService.execute(id);

    return plainToInstance(BusinessServicesResponseDto, service);
  }

  @Post('create')
  @ApiBearerAuth()
  @Roles(Role.BUSINESS, Role.ADMIN)
  @ApiOperation({ description: 'Only business owner can create a service' })
  @ApiOkResponse({ type: BusinessServicesResponseDto })
  @ApiForbiddenResponse({ description: 'User is not business owner or admin' })
  async create(
    @Query('id') id: string,
    @Body() dto: CreateServiceDto,
    @CurrentUser() user: UserTokenVersionDto,
  ) {
    const CreateService = new CreateServiceUseCase(
      this.serviceRepository,
      this.businessRepository,
    );
    const service = await CreateService.execute({
      businessId: id,
      userId: user.id,
      role: user.userType as Role,
      data: dto,
    });

    if (!service) throw new NotAcceptableException('Service not created');

    return plainToInstance(BusinessServicesResponseDto, service);
  }

  @Put('update')
  @ApiBearerAuth()
  @Roles(Role.BUSINESS, Role.ADMIN)
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
    const UpdateService = new UpdateServiceUseCase(this.serviceRepository);
    const service = await UpdateService.execute({
      userId: user.id,
      serviceId: id,
      role: user.userType as Role,
      dto,
    });

    if (!service) throw new NotAcceptableException('Service not updated');

    return plainToInstance(BusinessServicesResponseDto, service);
  }

  @Put('disable')
  @ApiBearerAuth()
  @Roles(Role.BUSINESS, Role.ADMIN)
  @ApiOperation({
    description:
      'Only business owner can disable, this action marks the service as disabled and cannot saw by users',
  })
  @ApiOkResponse({
    example: {
      status: 'Success',
      message: 'Service disabled',
      data: BusinessServicesResponseDto,
    },
  })
  @ApiForbiddenResponse({ description: 'User is not business owner or admin' })
  async disable(
    @Query('id') id: string,
    @CurrentUser() user: UserTokenVersionDto,
  ) {
    const DisableService = new DisableServiceUseCase(this.serviceRepository);
    const isDisabled = await DisableService.execute({
      userId: user.id,
      role: user.userType as Role,
      serviceId: id,
    });

    if (!isDisabled) throw new NotAcceptableException('Service not disabled');

    return {
      status: 'Success',
      message: 'Service disabled successfully',
      data: isDisabled,
    };
  }

  @Delete('delete')
  @ApiBearerAuth()
  @Roles(Role.BUSINESS, Role.ADMIN)
  @ApiOperation({
    description: 'Only business owner can delete, this action is irreversible',
  })
  @ApiOkResponse({ example: { status: 'Success', message: 'Service deleted' } })
  @ApiForbiddenResponse({ description: 'User is not business owner or admin' })
  async delete(
    @Query('id') id: string,
    @CurrentUser() user: UserTokenVersionDto,
  ) {
    const DeleteService = new DeleteServiceUseCase(this.serviceRepository);
    const service = await DeleteService.execute({
      userId: user.id,
      role: user.userType as Role,
      serviceId: id,
    });

    if (!service) throw new NotAcceptableException('Service not deleted');

    return {
      status: 'Success',
      message: 'Service deleted successfully',
    };
  }
}
