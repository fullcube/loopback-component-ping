# loopback-component-ping

[![CircleCI](https://circleci.com/gh/fullcube/loopback-component-ping.svg?style=svg)](https://circleci.com/gh/fullcube/loopback-component-ping) [![Coverage Status](https://coveralls.io/repos/github/fullcube/loopback-component-ping/badge.svg)](https://coveralls.io/github/fullcube/loopback-component-ping) [![Dependencies](http://img.shields.io/david/fullcube/loopback-component-ping.svg?style=flat)](https://david-dm.org/fullcube/loopback-component-ping) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Component for [LoopBack](https://loopback.io) that adds a model for retrieving the internal state of the Node process.

It is a wrapper around the [express-ping](https://github.com/palmerabollo/express-ping/) package.

# Installation

Install the module

    $ npm install --save loopback-component-ping

Configure the module in `server/component-config.json`

The configuration object accepts the following parameters:

- `acls` (array) (optional) allows you to specify LoopBack ACL definitions that will be applied to the Ping model. (Default: no ACL)
- `modelName` (string) (optional) allows to specify the name of the API endpoint that's used. (Default: 'Ping'),
- `parts` (object) (optional) allows you to filter out parts of the output by setting the value to false. (Default: show all parts)

```json
{
  "loopback-component-ping": {
    "parts": {
      "application": true,
      "environment": true,
      "resources": true,
      "system": true,
      "timestamp": true,
      "uptime": true
    },
    "modelName": "Ping",
    "acls": [{
      "accessType": "*",
      "principalType": "ROLE",
      "principalId": "$unauthenticated",
      "permission": "ALLOW"
    }]
  }
}
```


# Usage

After installation you should be able to retrieve data about the Node process through the new endpoint on your API:

[http://0.0.0.0:3000/api/Ping](http://0.0.0.0:3000/api/Ping)


```json
{
  "application": {
    "name": "test-server",
    "version": "1.0.0",
    "pid": 25663,
    "title": "node",
    "argv": [
      "/usr/local/bin/node",
      "/Users/beeman/workspace/fullcube/loopback-component-ping/test/test-server/server/server.js"
    ],
    "versions": {
      "http_parser": "2.7.0",
      "node": "6.9.0",
      "v8": "5.1.281.84",
      "uv": "1.9.1",
      "zlib": "1.2.8",
      "ares": "1.10.1-DEV",
      "icu": "57.1",
      "modules": "48",
      "openssl": "1.0.2j"
    },
    "node_env": "development"
  },
  "environment": {
    "- CUT -": "ALL ENV VARS WILL BE SHOWN",
    "NODE": "/usr/local/bin/node",
    "NODE_ENV": "development"
  },
  "resources": {
    "memory": {
      "rss": 127225856,
      "heapTotal": 100749312,
      "heapUsed": 77737976
    },
    "loadavg": [
      2.23828125,
      1.830078125,
      1.59423828125
    ],
    "cpu": [
      {
        "model": "Intel(R) Core(TM) i7-4980HQ CPU @ 2.80GHz",
        "speed": 2800,
        "times": {
          "user": 2503330,
          "nice": 0,
          "sys": 2401620,
          "idle": 23095740,
          "irq": 0
        }
      },
      {
        "- CUT -": "ALL CORES WILL BE SHOWN"
      }
    ],
    "disk": [
      {
        "filesystem": "/dev/disk1",
        "size": 487358464,
        "used": 350916048,
        "available": 136186416,
        "capacity": 0.73,
        "mount": "/"
      },
      {
        "- CUT -": "ALL DISKS WILL BE SHOWN"
      }
    ],
    "nics": {
      "lo0": [
        {
          "address": "::1",
          "netmask": "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
          "family": "IPv6",
          "mac": "00:00:00:00:00:00",
          "scopeid": 0,
          "internal": true
        },
        {
          "address": "127.0.0.1",
          "netmask": "255.0.0.0",
          "family": "IPv4",
          "mac": "00:00:00:00:00:00",
          "internal": true
        },
        {
          "address": "fe80::1",
          "netmask": "ffff:ffff:ffff:ffff::",
          "family": "IPv6",
          "mac": "00:00:00:00:00:00",
          "scopeid": 1,
          "internal": true
        }
      ],
      "- CUT -": "ALL NICS WILL BE SHOWN"
    }
  },
  "system": {
    "arch": "x64",
    "platform": "darwin",
    "type": "Darwin",
    "release": "15.6.0",
    "hostname": "dev.local",
    "uptime": 27998,
    "cores": 8,
    "memory": 17179869184
  },
  "timestamp": 1477214879328,
  "uptime": 22.002
}
```
