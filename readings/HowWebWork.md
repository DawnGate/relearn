# How the web work

| Source: https://github.com/vasanthk/how-web-works

What happen you you enter a url of website on browser?

1. You need have browser, internet, laptop
2. You enter a url(uniform resource locator) ex: google.com
3. DNS lookup - Find the IP(internet Protocol ) address of the url

   - Find from browser cache ( browser may cache the dns lookup for the url in 2-30 min)
   - Find in os cache ( operate system still cache some dns records)
   - Find in router cache
   - Find in DNS cache of ISP ( Internet service provider)
   - Find with recursive search: from url the ISP will try to finding IP with reverse like root name server => .com server -> google.com server

   Something, 1 domain can have multiple IP, some of the bottleneck and the solutions for it:

   1. Round-robin DNS: DNS return multiple IP addresses rather than just one
   2. Load-balancer: All request to 1 IP will divide and send to other servers to handle
   3. Geographic DNS: with the location information, the DNS will find the best IP for connect to the domain
   4. Any cast: 1 single IP -> maps to multiple physical servers (_It not rarely use_)

4. Opening of a socket + TLS Server

   - First 3 TCP hand shakes
   - After that TLS handshake for secure your data. First the browser will find the port to communicate( HTTP protocol : 80, HTTPs to port 443) and make TCP socket stream.
     The Client will send ClientHello message with it TLS version, the server reply with ServerHello with TLS version and the server's public certificate singed by CA ( Certificate Authority), the certificate will contain public key for encrypt data, the server will contain private key to decrypt data. The client will verify the certificate of the server, the client will send symmetric key ( random byte and encrypt with the server public key). The server decrypt the symmetric key and using this symmetric key to generate symmetric master key. The client sends a Finished message to the server, with the data has encrypt with the symmetric key. The server generate it hash for the finished message, and compare with the hash receive from the client, if it match then server will send FInished message to client and encrypted with the symmetric key. Now the TSL session transmit the application (HTTP) data encrypted with agreed symmetric key.

5. HTTP protocol

   - We will talk about simple get request (other special request like post, delete, put .... try to understand later or online, I know you still remember flight request or cors when try to these request)
   - when GET request to the URL to fetch (http://www.google.com), the browser will identify itself (User-Agent header) and the state of what types of responses it will accept (Accept and Accept-Encoding headers). We will see the connection header -> It tell server to keep the TCP connection open for further request
   - The request can contain cookies, this cookies will store in the os as a file and send with every request
   - After sending request and headers, the web browser sends a single blank newline to the server indicating that the content of the request is done. The server responds with a response code denoting status of the request and responds with a response of the form: 200 OK [response headers]
   - Followed by a single newline, and then sends a payload of the HTML content of www.google.com, the server will close or still open connected by the information of header from the request by client
   - Sometime, the server will response 304 Not Modified, with no payload, and it tell browser that the respond is not modify, just reuse the cache (include ETag, or last modified, with cache header ...)
   - The browser will parsing HTML, and the web browser (and server) will repeats this process for every request (image, css, file....), If the browser get data from other domain, this process will start again

   | Note: Trailing slash like http://facebook.com/ and http://facebook.com, the trailing slash of the url is the case when browser will stop, without trailing slash maybe make browser make additional request and get a round trip
   | The server might response with 301 Moved permanently -> tell browser go the "http://www.google.com" instead of "http://google.com" -> this will help in ranking your website

   HTTP response status:

   - 1xx indicated an informational message only
   - 2xx indicated success of some kind
   - 3xx redirects the client to another URL
   - 4xx indicated an error on the client's part
   - 5xx indicated an error on the server's part

6. HTTP Server request handle

HTTPD (HTTP Daemon) server is the one handling the requests/responses on the server side. The most common HTTPD servers are Apache or nginx for Linux and IIS for Windows.

- The HTTPD receives the requests
- the server break down the request into: HTTP request method (GET, POST, HEAD, PUT and DELETE), Domain, Request path/page
- The server will verify request method can accept, and the client is allowed to use this method (by IP, authentication, ..)
- The request can be modify by some pre config on server ( mod_rewrite , URL rewrite) => rewrite the request
- The server will pull the content or pass the request to the request handler (program, other server or process) and streams the output to the client
