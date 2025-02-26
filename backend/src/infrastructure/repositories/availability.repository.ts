import { Injectable } from '@nestjs/common';

import { PrismaService } from '../orm/prisma.service';
import { Availability } from '@/domain/entities/business/business-availability';
import { AvailabilityRepository } from '@/domain/interfaces/availability-repository';
import { Business } from '@/domain/entities';

@Injectable()
export class AvailabilityPrismaRepository implements AvailabilityRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves a business's availability by its ID from the database.
   *
   * @param businessId - The unique identifier of the business to retrieve its availability.
   * @returns A promise that resolves with a single Availability object, or null if no business with the given ID is found.
   */
  async getAvailabilityByBusinessId(
    businessId: string,
  ): Promise<Availability | null> {
    const result = await this.prisma.availability.findUnique({
      where: { id: businessId },
      include: { business: true },
    });

    if (!result) return null;

    return new Availability({
      ...result,
      business: new Business({
        ...result.business,
        latitude: result.business.latitude?.toNumber(),
        longitude: result.business.longitude?.toNumber(),
      }),
    });
  }

  /**
   * Retrieves a service's availability by its ID from the database.
   *
   * @param serviceId - The unique identifier of the service to retrieve its availability.
   * @returns A promise that resolves with a single Availability object, or null if no service with the given ID is found.
   */
  async getAvailabilityByServiceId(
    serviceId: string,
  ): Promise<Availability | null> {
    const result = await this.prisma.availability.findUnique({
      where: { id: serviceId },
      include: { business: true },
    });

    if (!result) return null;

    return new Availability({
      ...result,
      business: new Business({
        ...result.business,
        latitude: result.business.latitude?.toNumber(),
        longitude: result.business.longitude?.toNumber(),
      }),
    });
  }

  /**
   * Creates a new availability in the database.
   *
   * @param availability - The Availability object to save.
   * @returns A promise that resolves with the newly created Availability object.
   */
  async saveAvailability(availability: Availability): Promise<Availability> {
    const newRecord = await this.prisma.availability.create({
      data: {
        dayOfWeek: availability.dayOfWeek,
        startTime: availability.startTime,
        endTime: availability.endTime,
        business: { connect: { id: availability.businessId } },
      },
      include: { business: true },
    });

    return new Availability({
      ...newRecord,
      business: new Business({
        ...newRecord.business,
        latitude: newRecord.business.latitude?.toNumber(),
        longitude: newRecord.business.longitude?.toNumber(),
      }),
    });
  }

  /**
   * Updates an existing availability in the database.
   *
   * @param availability - The updated Availability object to save.
   * @returns A promise that resolves with the updated Availability object.
   */
  async updateAvailability(availability: Availability) {
    const updated = await this.prisma.availability.update({
      where: { id: availability.id },
      data: {
        dayOfWeek: availability.dayOfWeek,
        startTime: availability.startTime,
        endTime: availability.endTime,
      },
    });

    return new Availability(updated);
  }

  async deleteAvailability(id: string) {
    const deleteAvailability = await this.prisma.availability.delete({
      where: { id },
    });

    return new Availability(deleteAvailability);
  }

  /**
   * Associates a service with an existing availability in the database.
   *
   * @param availabilityId - The unique identifier of the availability to update.
   * @param serviceId - The unique identifier of the service to associate with the availability.
   * @returns A promise that resolves with the updated Availability object.
   */
  async addServiceToAvailability(
    availabilityId: string,
    serviceId: string,
  ): Promise<Availability> {
    const availability = await this.prisma.availability.update({
      where: { id: availabilityId },
      data: { service: { connect: { id: serviceId } } },
    });

    return new Availability(availability);
  }
}
