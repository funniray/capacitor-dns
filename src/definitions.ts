export interface CapacitorDNSPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
