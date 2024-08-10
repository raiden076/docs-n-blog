---
tags:
  - by_ai
  - dev/web/portfolio/projects
title: project - dynamic proxy
slug: 20240806153629-project---dynamic-proxy
id: 20240806153629-project---dynamic-proxy
---
### Explanation of code:

The code provided is a Cloudflare Workers script designed to act as a proxy server. It intercepts incoming HTTP requests, modifies them as necessary, and forwards them to the appropriate backend server. Here's a detailed explanation of each part:

### Event Listener
```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
```
This line sets up an event listener for fetch events, which are triggered by HTTP requests. When a fetch event occurs, the `handleRequest` function is called, and the response from this function is sent back to the client.

### Helper Function: `getProxySite`
```javascript
const getProxySite = (host, rootDomain) => {
  return host.split(`.${rootDomain}`)[0]; 
}
```
This function extracts the subdomain from the host. For example, if `host` is `example.serp.ing` and `rootDomain` is `serp.ing`, it will return `example`.

### Constant: `currentDomain`
```javascript
const currentDomain = "serp.ing";
```
This defines the root domain used in the `getProxySite` function.

### Main Function: `handleRequest`
```javascript
async function handleRequest(request) {
  const url = new URL(request.url);
  const host = url.host;

  if (url.pathname === '/robots.txt') {
    const robots = `User-agent: *
Disallow: /
    `;
    return new Response(robots, { status: 200 });
  }

  const proxySite = getProxySite(host, currentDomain);
  const urlPath = url.pathname;
  const origin = `https://${proxySite}`; 
  const actualUrl = new URL(`${origin}${urlPath}${url.search}${url.hash}`); 

  const modifiedRequestInit = {
    method: request.method,
    headers: request.headers,
    redirect: 'follow'
  };

  if (!['GET', 'HEAD'].includes(request.method)) {
    const requestBody = await request.clone().arrayBuffer();
    modifiedRequestInit.body = requestBody;
  }

  const modifiedRequest = new Request(actualUrl, modifiedRequestInit);

  const response = await fetch(modifiedRequest);

  let body = await response.arrayBuffer();
  const contentType = response.headers.get('content-type');

  if (contentType && (contentType.includes('text/') || contentType.includes('application/x-javascript'))) {
    let text = new TextDecoder('utf-8').decode(body);
    text = text.replace(new RegExp(proxySite, 'g'), host);
    body = new TextEncoder().encode(text).buffer;
  }

  const modifiedResponse = new Response(body, response);
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
  return modifiedResponse;
}
```
#### Breakdown:
1. **Parsing the URL and Host:**
   ```javascript
   const url = new URL(request.url);
   const host = url.host;
   ```

2. **Handling `/robots.txt` Requests:**
   ```javascript
   if (url.pathname === '/robots.txt') {
     const robots = `User-agent: *
Disallow: /
     `;
     return new Response(robots, { status: 200 });
   }
   ```
   If the request is for `/robots.txt`, it responds with a disallow-all directive.

3. **Determining the Origin:**
   ```javascript
   const proxySite = getProxySite(host, currentDomain);
   const urlPath = url.pathname;
   const origin = `https://${proxySite}`; 
   const actualUrl = new URL(`${origin}${urlPath}${url.search}${url.hash}`); 
   ```
   It constructs the actual URL to fetch by combining the proxy site with the path, search parameters, and hash.

4. **Creating the Modified Request:**
   ```javascript
   const modifiedRequestInit = {
     method: request.method,
     headers: request.headers,
     redirect: 'follow'
   };

   if (!['GET', 'HEAD'].includes(request.method)) {
     const requestBody = await request.clone().arrayBuffer();
     modifiedRequestInit.body = requestBody;
   }

   const modifiedRequest = new Request(actualUrl, modifiedRequestInit);
   ```
   It clones the original request, retaining its method, headers, and body (if applicable).

5. **Fetching the Response:**
   ```javascript
   const response = await fetch(modifiedRequest);
   ```

6. **Modifying the Response Body:**
   ```javascript
   let body = await response.arrayBuffer();
   const contentType = response.headers.get('content-type');

   if (contentType && (contentType.includes('text/') || contentType.includes('application/x-javascript'))) {
     let text = new TextDecoder('utf-8').decode(body);
     text = text.replace(new RegExp(proxySite, 'g'), host);
     body = new TextEncoder().encode(text).buffer;
   }
   ```
   If the content type is text or JavaScript, it replaces instances of the proxy site with the original host in the response body.

7. **Returning the Modified Response:**
   ```javascript
   const modifiedResponse = new Response(body, response);
   modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
   return modifiedResponse;
   ```
   It sets the `Access-Control-Allow-Origin` header to allow cross-origin requests and returns the modified response.

### Summary
This Cloudflare Workers script acts as a dynamic proxy. It handles incoming requests, modifies them as necessary (including updating URLs and handling request bodies for non-GET/HEAD methods), fetches the corresponding response from the target server, optionally modifies the response body, and then returns the modified response to the client. This approach allows for flexible and dynamic routing based on subdomains.



....................................

Revision with proxy.akaprav0.in/ (site) 

Yes, it can be done. The main change required is to adjust the way the `proxySite` is extracted from the URL and modify how the actual URL is constructed. Here's the updated code:

### Event Listener
```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
```

### Helper Function: `getProxySite`
```javascript
const getProxySite = (pathname) => {
  const parts = pathname.split('/');
  return parts[1]; // Assuming the structure is always /<proxy-site.url>/<other-path>
}
```

### Constant: `currentDomain`
```javascript
const currentDomain = "proxy.arkaprav0.in";
```

### Main Function: `handleRequest`
```javascript
async function handleRequest(request) {
  const url = new URL(request.url);
  const host = url.host;
  const pathname = url.pathname;

  if (pathname === '/robots.txt') {
    const robots = `User-agent: *
Disallow: /
    `;
    return new Response(robots, { status: 200 });
  }

  const proxySite = getProxySite(pathname);
  const urlPath = pathname.split('/').slice(2).join('/'); // Get the rest of the path after the proxy site
  const origin = `https://${proxySite}`;
  const actualUrl = new URL(`${origin}/${urlPath}${url.search}${url.hash}`);

  const modifiedRequestInit = {
    method: request.method,
    headers: request.headers,
    redirect: 'follow'
  };

  if (!['GET', 'HEAD'].includes(request.method)) {
    const requestBody = await request.clone().arrayBuffer();
    modifiedRequestInit.body = requestBody;
  }

  const modifiedRequest = new Request(actualUrl, modifiedRequestInit);

  const response = await fetch(modifiedRequest);

  let body = await response.arrayBuffer();
  const contentType = response.headers.get('content-type');

  if (contentType && (contentType.includes('text/') || contentType.includes('application/x-javascript'))) {
    let text = new TextDecoder('utf-8').decode(body);
    text = text.replace(new RegExp(proxySite, 'g'), host);
    body = new TextEncoder().encode(text).buffer;
  }

  const modifiedResponse = new Response(body, response);
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
  return modifiedResponse;
}
```

### Breakdown of Changes:
1. **getProxySite Function:**
   - The `getProxySite` function now extracts the proxy site from the pathname rather than the host.
   - It assumes that the proxy site is the first part of the pathname (i.e., `proxy.arkaprav0.in/<proxy-site.url>`).

2. **Path Handling:**
   - The rest of the path is reconstructed by splitting the pathname and removing the first two elements (which are empty string and proxy site).

3. **URL Construction:**
   - The actual URL is constructed using the extracted proxy site and the remaining path.

4. **Response Modification:**
   - The response modification part remains the same, ensuring that text content is modified to replace instances of the proxy site with the original host.

This approach allows for a more intuitive way of accessing proxied sites by using the `proxy. Arkaprav 0. In/<proxy-site.url>` format.

### Notes :
- Add logging so that every uses are logged and mention this on the project page
- 
