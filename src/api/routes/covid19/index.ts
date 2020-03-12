'use strict';

import * as Wreck from '@hapi/wreck';
import { JSDOM } from 'jsdom';

const BASE_URI = 'https://coronavirus.1point3acres.com/';

export const fetch_covid19_data = async (request, reply) => {
    const locale = request.params.locale || 'en';
    const uri = BASE_URI + locale;
    
    const { res, payload } = await Wreck.get(uri, { json: false });
    const { document } = new JSDOM(payload.toString()).window;
    const title = document.querySelector('title').textContent;
    const description = document.querySelector("meta[name='description']").content;
    const us_total = description.match(/(?<us_num>\d+)\sconfirmed cases in US/).groups['us_num'];
    const ca_total = description.match(/(?<ca_num>\d+)\sconfirmed cases in Canada/).groups['ca_num'];
    
    const update_time = description.match(/(?<update_time>\d{4}-\d{2}-\d{2} \d{2}:\d{2})/).groups['update_time'];

    const state_detail = document.querySelectorAll("#map > div.tab-container > div.active > div.state-table > div > div.row");
    const state_json = {};
    state_detail.forEach(nodeList => {
        const span_node = nodeList.childNodes;
        state_json[span_node[0].textContent] = {
            confirmed: span_node[1].textContent,
            new: span_node[2].textContent,
            deaths: span_node[3].textContent,
            source: span_node[4].querySelector('div > a') ? span_node[4].querySelector('div > a').getAttribute('href') : '',
        };
    });
    
    return reply.view('covid19', 
    { 
        title : title, 
        description: description,
        us_total: us_total,
        ca_total: ca_total,
        update_time: update_time,
        state_json: state_json,
    });
};

const covid19 = [
    {
        method: 'GET',
        path: '/api/covid19/{locale?}',   
        handler: fetch_covid19_data,
    }
];

export { covid19 };