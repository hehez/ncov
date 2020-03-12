'use strict';

const Hapi      = require('@hapi/hapi');
const fs        = require('fs');
const dotenv    = require('dotenv');
const URL       = require('url');

import { routes, func_covid19 }       from './api/routes';
import * as Inert       from '@hapi/inert';
import * as Logging     from 'hapi-pino';
import * as Vision      from '@hapi/vision';
import * as HandleBars  from 'handlebars';

const VERSION = '0.1.0';
dotenv.config();

console.log(process.env.HTTP_PORT);

const config = {
    host: '0.0.0.0',
    port: process.env.HTTP_PORT || 5000,
    routes: {
        cors: {
            origin: ['*']
        }
    }
}

// differernt way to add plugins
const plugins = [
    Inert,
    {
        plugin: Vision,
    },
    {
        plugin: require('hapi-geo-locate'),
        options: {
            enabledByDefault: true
        }
    }
]

const server = new Hapi.Server(config);

const init = async (): Promise<void> => {
    // multiple plugins
    await server.register(plugins);
    
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

    server.route({
        method: 'GET',
        path: '/',
        handler: func_covid19,
    });

    await server.start();
    console.log('HTTP Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

export { VERSION, init };
