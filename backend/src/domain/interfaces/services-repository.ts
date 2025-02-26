import { BusinessService } from '../entities/business';

export interface BusinessServicesRepository {
  getAllServices(): Promise<BusinessService[] | null>;
  getServicesByBusinessId(id: string): Promise<BusinessService[] | null>;
  getServiceById(id: string): Promise<BusinessService | null>;
  createService(service: BusinessService): Promise<BusinessService | null>;
  updateService(service: BusinessService): Promise<BusinessService>;
  filterServiceByNameAndBusiness(
    name: string,
    businessId: string,
  ): Promise<BusinessService | null>;
  disableService(id: string): Promise<BusinessService | false>;
  deleteService(id: string): Promise<boolean>;
}
