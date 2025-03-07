import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/orm/prisma.service';
import { TokenVersionRepository } from '@/domain/interfaces/token-version-repository';

@Injectable()
export class TokenVersionPrismaRepository implements TokenVersionRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves the version of a token identified by its ID.
   *
   * @param id - The ID of the token to retrieve the version for.
   * @returns The version of the token, or throws a NotFoundException if the token does not exist.
   */
  async getVersion(id: string) {
    const token = await this.prisma.tokenVersion.findUnique({
      where: { userId: id },
    });

    if (!token) return null;

    return token?.version;
  }

  /**
   * Invalidates a token version by incrementing its version number.
   *
   * This method updates the token version identified by the provided ID,
   * incrementing the version number by 1. If the token with the given
   * ID does not exist, a NotFoundException is thrown.
   *
   * @param id - The unique identifier of the token version to be invalidated.
   * @returns A promise that resolves to true if the token version was successfully invalidated.
   * @throws NotFoundException if the token version with the given ID is not found.
   */
  async invalidateVersion(id: string) {
    const token = await this.prisma.tokenVersion.update({
      where: { userId: id },
      data: { version: { increment: 1 } },
    });

    if (!token) throw new NotFoundException('Token not found');
    return true;
  }
}
