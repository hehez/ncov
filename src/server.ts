'use strict';

const Hapi = require('@hapi/hapi');

import { routes }       from './api/routes';
import * as Inert       from '@hapi/inert';
import * as Logging     from 'hapi-pino';
import * as Version     from '@hapi/vision';
import * as HandleBars  from 'handlebars';

const VERSION = '0.1.0';

const server = new Hapi.Server({
    port: process.env.port || 3000,
    host: 'localhost',
    routes: {
        cors: {
            origin: ['*']
        }
    }
});

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

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

export { VERSION, init };
