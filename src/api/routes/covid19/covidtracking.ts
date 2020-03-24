'use strict';

import * as fetch from 'node-fetch';

const BASE_URI = 'https://covidtracking.com/api/';

export const fetch_covid19_test_state_current_data = async (state_name) => {
    const state_current = 'states?state=' + state_name;
    const res = await (await fetch(BASE_URI + state_current)).json();
    return res;
};

const covid19_tracking = [
    {
        method: 'GET',
        path: '/api/covid19/states',   
        handler: fetch_covid19_test_state_current_data,
    }
];

export {
    covid19_tracking,
};

