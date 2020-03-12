'use strict';

import { wuhan } from './wuhan';
import { covid19 } from './covid19';
export { fetch_covid19_data as func_covid19 } from './covid19';

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