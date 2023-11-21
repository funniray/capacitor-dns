export declare type Address = {
    address: string;
    family: 4 | 6;
};
export interface CapacitorDNSNativePlugin {
    lookup(options: {
        hostname: string;
    }): Promise<{
        addresses: Address[];
    }>;
}
