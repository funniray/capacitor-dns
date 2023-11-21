import { WebPlugin } from '@capacitor/core';

import type { CapacitorDNSPlugin } from './definitions';

export class CapacitorDNSWeb extends WebPlugin implements CapacitorDNSPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
