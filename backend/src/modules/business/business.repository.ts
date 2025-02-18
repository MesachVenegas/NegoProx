import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class BusinessRepository {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: implement find business by query(name, address, userId, id).
  // TODO: implement get all business.
  // TODO: implemente create a new business.
  // TODO: implement promote user a business owner.
  // TODO: implement update a business.
  // TODO: implement delete a business.
}
