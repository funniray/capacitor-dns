import type { Address } from './definitions';
declare type LookupOptions = {
    family?: 0 | 4 | 6;
    hints?: any;
    all?: boolean;
    verbatim?: boolean;
};
declare type LookupCallback = (err: Error | null, address?: Address[] | string, family?: number) => void;
export declare function lookup(hostname: string, options: LookupOptions | LookupCallback, callback?: LookupCallback): void;
declare class CapacitorDNSPromises {
    lookup(hostname: string, options?: LookupOptions): Promise<Address | Address[]>;
}
export declare const dnsPromises: CapacitorDNSPromises;
export {};
