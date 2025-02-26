import { Availability } from '../entities/business/business-availability';

export interface AvailabilityRepository {
  getAvailabilityByBusinessId(businessId: string): Promise<Availability | null>;
  getAvailabilityByServiceId(serviceId: string): Promise<Availability | null>;
  saveAvailability(availability: Availability): Promise<Availability>;
  updateAvailability(availability: Availability): Promise<Availability>;
  deleteAvailability(id: string): Promise<Availability>;
  addServiceToAvailability(
    availabilityId: string,
    serviceId: string,
  ): Promise<Availability>;
}
