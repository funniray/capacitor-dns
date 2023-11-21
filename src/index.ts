import { registerPlugin } from '@capacitor/core';

import type { CapacitorDNSPlugin } from './definitions';

const CapacitorDNS = registerPlugin<CapacitorDNSPlugin>('CapacitorDNS', {
  web: () => import('./web').then(m => new m.CapacitorDNSWeb()),
});

export * from './definitions';
export { CapacitorDNS };
