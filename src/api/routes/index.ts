'use strict';

import { wuhan } from './wuhan';
import { covid19 } from './covid19';

export const routes = [
    ...wuhan, 
    ...covid19,
    {
        method: 'GET',
        path: '/public/css/{file*}',
        handler: {
            directory: {
                path: 'src/public/css'
            }
        }
    }
];