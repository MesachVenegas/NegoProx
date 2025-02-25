export interface TokenVersionRepository {
  getVersion(id: string): Promise<number>;
  invalidateVersion(id: string): Promise<boolean>;
}
