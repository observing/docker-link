# docker-link

Parser for reading environment variables set by docker link. Reading the
environment variables available to the `CMD` running inside a docker container
can be a bit cumbersome as it depends on the `alias` chosen to name the link.
This can be easily fixed to prepend variables with prefix of your choosing.

### Installation

```bash
npm install --save docker-link
```

### Usage

Suppose the following environment variables were set by creating a link
between your application and a Docker container running Redis. Those Docker
link variables can then be read from the application by using `new Link`.

```bash
PREFIX_REDIS_PORT=tcp://172.17.0.2:6379
PREFIX_REDIS_PORT_6379_TCP=tcp://172.17.0.2:6379
PREFIX_REDIS_PORT_6379_TCP_ADDR=172.17.0.2
PREFIX_REDIS_PORT_6379_TCP_PORT=6379
PREFIX_REDIS_PORT_6379_TCP_PROTO=tcp
PREFIX_REDIS_NAME=/container/redis
```

```js
var Link = require('docker-link')
  , link = new Link({ prefix: 'PREFIX_' });

//
// Which would result in: link.get('REDIS');
//
{
  PORT_TCP: 'tcp://172.17.0.2:6379',
  PORT: 'tcp://172.17.0.2:6379',
  PORT_TCP_ADDR: '172.17.0.2',
  PORT_TCP_PORT: '6379',
  PORT_TCP_PROTO: 'tcp',
  NAME: '/container/redis'
}
```
