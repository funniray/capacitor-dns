import { registerPlugin } from '@capacitor/core';

import type {Address, CapacitorDNSNativePlugin} from './definitions';

const dnsPlugin = registerPlugin<CapacitorDNSNativePlugin>('CapacitorDNS', {});

type LookupOptions = {
  family?: 0 | 4 | 6,
  hints?: any,
  all?: boolean,
  verbatim?: boolean
}

type LookupCallback =
    (err: Error | null, address?: Address[] | string, family?: number) => void


export function lookup(hostname: string, options: LookupOptions | LookupCallback, callback?: LookupCallback): void {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }

  const family = options.family || 0;
  const all = options.all || false;

  dnsPlugin.lookup({hostname}).then(({addresses})=> {
    const familyAddresses = family ? addresses.filter(a=>a.family==family) : addresses;
    if (!callback) return;

    if (all) {
      callback(null, familyAddresses);
    } else {
      const address = familyAddresses[0];
      if (address) {
        callback(null, address.address, address.family);
      } else {
        callback(new Error("Host not found"));
      }
    }
  }).catch(e=>callback?.(e));
}

class CapacitorDNSPromises {
  lookup(hostname: string, options?: LookupOptions): Promise<Address | Address[]> {
    return new Promise((res,rej)=>{
      lookup(hostname, options || {}, (err, address, family)=> {
        if (err) {
          rej(err)
        } else {
          if (options?.all) {
            res(address as Address[])
          } else {
            res({address: address as string, family: family as 4 | 6});
          }
        }
      })
    })
  }
}

export const dnsPromises = new CapacitorDNSPromises();
