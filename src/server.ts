'use strict';

const Hapi      = require('@hapi/hapi');
const fs        = require('fs');
const dotenv    = require('dotenv');
const URL       = require('url');

import { routes }       from './api/routes';
import * as Inert       from '@hapi/inert';
import * as Logging     from 'hapi-pino';
import * as Version     from '@hapi/vision';
import * as HandleBars  from 'handlebars';

const VERSION = '0.1.0';
dotenv.config();

const config = {
    host: '0.0.0.0',
    http: {
        port: process.env.HTTP_PORT || 3000,
    },
    https: {
        protocol: process.env.HTTPS_PROTOCOL,
        port: process.env.HTTPS_PORT || 443,
        key: fs.readFileSync(process.env.HTTPS_KEY),
        cert: fs.readFileSync(process.env.HTTPS_CERT)
    },
    routes: {
        cors: {
            origin: ['*']
        }
    }
}

/**
 * Create HTTP server
 */
const http = new Hapi.Server({ port: config.http.port });

/**
 * Create HTTPS server
 */
const server = new Hapi.Server({ port: config.https.port, tls: config.https });

const init = async (): Promise<void> => {
    // multiple plugins
    await server.register([
        Inert,
        {
            plugin: Version,
        },
        {
            plugin: require('hapi-geo-locate'),
            options: {
                enabledByDefault: true
            }
        }
    ]);
    
    // logger plugin
    await server.register({
        plugin: Logging,
        options: {
            level: 'info', //trace, info=30
            timestamp: false,
            prettyPrint: process.env.NODE_ENV !== 'production',
            logEvents: null
        }
    });

    // set up handlebars as a view engine
    server.views({
        engines: {
            html: HandleBars
        },
        relativeTo: __dirname,
        path: 'public/templates',
    });

    // multiple routes
    server.route(routes);

    // redirect HTTP to HTTPS
    http.ext('onRequest', (request, h) => {
        if (request.url.port !== config.https.port) {
            const redirect_url = URL.format({
                protocol: config.https.protocol,
                hostname: request.info.hostname,
                pathname: request.url.pathname,
                port: config.https.port
            });
            return h.redirect(redirect_url).code(301).takeover();
        }
        return h.continue();
    });

    await http.start();
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

export { VERSION, init };
