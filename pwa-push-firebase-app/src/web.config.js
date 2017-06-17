<?xml version="1.0" encoding="utf-8"?>
<configuration>
    <system.webServer>
        <staticContent>
            <remove fileExtension=".woff" />
            <mimeMap fileExtension=".woff" mimeType="application/x-font-woff" />
            <remove fileExtension=".woff2" />
            <mimeMap fileExtension=".woff2" mimeType="application/x-font-woff2" />
           <remove fileExtension=".ttf" />
            <mimeMap fileExtension=".ttf" mimeType="application/octet-stream" />
            <remove fileExtension=".svg" />
            <mimeMap fileExtension=".svg" mimeType="image/svg+xml" />
            <remove fileExtension=".png" />
            <mimeMap fileExtension=".png" mimeType="image/png" />
            <remove fileExtension=".json" />
            <mimeMap fileExtension=".json" mimeType="application/json" />
            <remove fileExtension=".xml" />
           <mimeMap fileExtension=".xml" mimeType="application/xml" />
        </staticContent>
    </system.webServer>
</configuration>
