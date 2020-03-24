'use strict';

import { wuhan }                                                    from './wuhan';
import { covid19 }                                                  from './covid19';
import { covid19_tracking }                                         from './covid19/covidtracking'
export { fetch_covid19_data as func_covid19 }                       from './covid19';

export const routes = [
    ...wuhan, 
    ...covid19,
    ...covid19_tracking,
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