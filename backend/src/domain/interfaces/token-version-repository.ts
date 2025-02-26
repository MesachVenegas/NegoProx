export interface TokenVersionRepository {
  getVersion(id: string): Promise<number | null>;
  invalidateVersion(id: string): Promise<boolean>;
}
