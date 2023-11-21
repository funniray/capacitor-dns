package com.getcapacitor;

import static org.junit.Assert.*;

import org.junit.Test;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
public class ExampleUnitTest {

    @Test
    public void addition_isCorrect() throws Exception {
        assertEquals(4, 2 + 2);
    }

    @Test
    public void dnsTest() throws UnknownHostException {
        InetAddress[] addrs = InetAddress.getAllByName("google.com");
        for (InetAddress address : addrs) {
            System.out.println(addrs);
        }
    }
}
