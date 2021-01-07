package com.seproj.cloudhomework.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class PythonHelper {
    public void callScriptConvert(String filePath, String base64) {
        String[] args = new String[] {"python", filePath, base64};
        try {
            Process process = Runtime.getRuntime().exec(args);
            BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream(), "GBK"));
            String line = null;
            while ((line = in.readLine()) != null) {
                System.out.println(line);
            }
            in.close();
            int re = process.waitFor();
            System.out.println(re);
        }   catch (Exception e) {
            e.printStackTrace();
        }
    }
}
