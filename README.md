# RequestRain

A testing tool that sends many requests to an HTTP server.

```
Usage: reqrain [options] <server-url>

Sends multiple requests to an HTTP server.

Arguments:
  server-url         HTTP server URL.

Options:
  -V, --version      output the version number
  --threads <quant>  Number of threads to be used.
                     Default: 2
  --req-delay <ms>   Delay in milliseconds for each request per thread.
                     Default: 20
  -h, --help         display help for command
```

## Example:
```
reqrain http://localhost:8080 --threads 3
```
