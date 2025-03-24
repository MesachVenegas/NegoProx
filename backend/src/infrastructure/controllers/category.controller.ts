import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
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
import { HttpErrorResponseDto } from '../dto/http-error-response.dto';
import { CategoryDto } from '@/application/categories/dto/category.dto';
import { CategoryPrismaRepository } from '../repositories/category.repository';
import { SaveCategoryDto } from '@/application/categories/dto/saveCategory.dto';
import { GetACategoryUseCase } from '@/application/categories/use-cases/getACategory';
import { SaveCategoryUseCase } from '@/application/categories/use-cases/saveCategory';
import { GetAllCategoriesUseCase } from '@/application/categories/use-cases/getCategories';
import { DeleteCategoryUseCase } from '@/application/categories/use-cases/deleteCategory';

@ApiTags('Categories')
@Controller('category')
@UseGuards(JwtGuard, RoleGuard)
@ApiBadRequestResponse({
  type: HttpErrorResponseDto,
  example: {
    error: {
      error: 'Bad Request Error',
      message: 'BAD_REQUEST',
      statusCode: 400,
    },
    timestamp: new Date(),
  },
})
@ApiInternalServerErrorResponse({
  type: HttpErrorResponseDto,
  example: {
    error: {
      error: 'Internal Server Error',
      message: 'INTERNAL_SERVER_ERROR',
      statusCode: 500,
    },
    timestamp: new Date(),
  },
})
export class CategoryController {
  constructor(private readonly categoryRepository: CategoryPrismaRepository) {}

  @Get()
  @Public()
  @ApiOperation({
    description: 'Get all categories',
  })
  @ApiOkResponse({ type: [CategoryDto] })
  getCategories() {
    const useCase = new GetAllCategoriesUseCase(this.categoryRepository);
    const categories = useCase.execute();

    return categories;
  }

  @Get('/:id')
  @Public()
  @ApiOperation({
    description: 'Get a category by id',
  })
  @ApiOkResponse({ type: CategoryDto })
  @ApiNotFoundResponse({
    type: HttpErrorResponseDto,
    example: {
      error: {
        error: 'Category not found',
        message: 'NOT_FOUND',
        statusCode: 404,
      },
      timestamp: new Date(),
    },
  })
  getCategoryById(@Param('id') id: string) {
    const useCase = new GetACategoryUseCase(this.categoryRepository);
    const category = useCase.execute(id);

    return category;
  }

  @Post('/create')
  @Roles(Role.ADMIN)
  @ApiConflictResponse({
    type: HttpErrorResponseDto,
    example: {
      error: {
        error: 'Category already exists',
        message: 'CONFLICT',
        statusCode: 409,
      },
      timestamp: new Date(),
    },
  })
  async createCategory(@Body() data: SaveCategoryDto) {
    const useCase = new SaveCategoryUseCase(this.categoryRepository);
    const category = await useCase.execute(data);

    return category;
  }

  @Delete('/delete/:id')
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: CategoryDto, description: 'Category deleted data' })
  @ApiNotFoundResponse({
    type: HttpErrorResponseDto,
    example: {
      error: {
        error: 'Category not found',
        message: 'NOT_FOUND',
        statusCode: 404,
      },
      timestamp: new Date(),
    },
  })
  async deleteCategory(@Param('id') id: string) {
    const useCase = new DeleteCategoryUseCase(this.categoryRepository);
    const deleted = await useCase.execute(id);

    return deleted;
  }
}
