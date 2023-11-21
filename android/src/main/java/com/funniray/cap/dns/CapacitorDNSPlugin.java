package com.funniray.cap.dns;

import com.getcapacitor.*;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.UnknownHostException;

@CapacitorPlugin(name = "CapacitorDNS")
public class CapacitorDNSPlugin extends Plugin {

    @PluginMethod
    public void lookup(PluginCall call) {
        String hostname = call.getString("hostname");

        InetAddress[] addresses;

        try {
            addresses = InetAddress.getAllByName(hostname);
        } catch (UnknownHostException e) {
            call.reject(e.getLocalizedMessage());
            return;
        }

        JSObject ret = new JSObject();
        JSArray ipList = new JSArray();

        for(InetAddress address : addresses) {
            JSObject addressObj = new JSObject();
            addressObj.put("address", address.getHostAddress());
            addressObj.put("family", address instanceof Inet4Address ? 4 : 6);
            ipList.put(addressObj);
        }

        ret.put("addresses", ipList);
        call.resolve(ret);
    }
}
