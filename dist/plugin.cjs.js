'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

const dnsPlugin = core.registerPlugin('CapacitorDNS', {});
function lookup(hostname, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = {};
    }
    const family = options.family || 0;
    const all = options.all || false;
    dnsPlugin.lookup({ hostname }).then(({ addresses }) => {
        const familyAddresses = family ? addresses.filter(a => a.family == family) : addresses;
        if (!callback)
            return;
        if (all) {
            callback(null, familyAddresses);
        }
        else {
            const address = familyAddresses[0];
            if (address) {
                callback(null, address.address, address.family);
            }
            else {
                callback(new Error("Host not found"));
            }
        }
    }).catch(e => callback === null || callback === void 0 ? void 0 : callback(e));
}
class CapacitorDNSPromises {
    lookup(hostname, options) {
        return new Promise((res, rej) => {
            lookup(hostname, options || {}, (err, address, family) => {
                if (err) {
                    rej(err);
                }
                else {
                    if (options === null || options === void 0 ? void 0 : options.all) {
                        res(address);
                    }
                    else {
                        res({ address: address, family: family });
                    }
                }
            });
        });
    }
}
const dnsPromises = new CapacitorDNSPromises();

exports.dnsPromises = dnsPromises;
exports.lookup = lookup;
//# sourceMappingURL=plugin.cjs.js.map
