import { Injectable, NotFoundException } from '@nestjs/common';

import { Business } from '@/domain/entities';
import { PrismaService } from '../orm/prisma.service';
import { Availability } from '@/domain/entities/business/business-availability';
import { AvailabilityRepository } from '@/domain/interfaces/availability-repository';

@Injectable()
export class AvailabilityPrismaRepository implements AvailabilityRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves the availability records of a business by its ID from the database.
   *
   * @param businessId - The unique identifier of the business to retrieve its availability records.
   * @returns A promise that resolves with an array of Availability objects, or null if no availability records
   *          are found for the given business ID.
   */
  async getAvailabilityByBusinessId(
    businessId: string,
  ): Promise<Availability[] | null> {
    const result = await this.prisma.availability.findMany({
      where: { businessId: businessId },
      include: { business: true },
    });

    if (!result) return null;

    const availability = result.map(
      (item) =>
        new Availability({
          ...item,
          business: new Business({
            ...item.business,
            latitude: item.business.latitude?.toNumber(),
            longitude: item.business.longitude?.toNumber(),
          }),
        }),
    );

    return availability;
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

  async getAvailabilityById(id: string): Promise<Availability | null> {
    const result = await this.prisma.availability.findUnique({
      where: { id },
      include: { business: true },
    });

    if (!result)
      throw new NotFoundException('Availability not found or not exist');

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
   * Saves multiple availability records to the database and returns the saved entities.
   *
   * @param availability - An array of Availability objects to be saved.
   * @returns A promise that resolves with an array of saved Availability objects.
   */
  async saveAvailability(
    availability: Availability[],
  ): Promise<Availability[]> {
    const data = availability.map((item) => ({
      dayOfWeek: item.dayOfWeek,
      startTime: item.startTime,
      endTime: item.endTime,
      businessId: item.businessId,
    }));

    const records = await this.prisma.availability.createManyAndReturn({
      data,
    });

    return records.map((item) => new Availability(item));
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
