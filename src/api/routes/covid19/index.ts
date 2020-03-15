'use strict';

import * as Wreck from '@hapi/wreck';
import { JSDOM } from 'jsdom';

import * as states from '../../../config/locales/states-mapping.json';
import * as dict from '../../../config/locales/dictionary.json';

const BASE_URI = 'https://coronavirus.1point3acres.com/';

export const fetch_covid19_data = async (request, reply) => {
    const locale = request.params.locale || 'en';
    const uri = BASE_URI + locale;
    
    const { res, payload } = await Wreck.get(uri, { json: false });
    const { document } = new JSDOM(payload.toString()).window;
    const title = 'COVID-19/Coronavirus Real Time Updates';
    
    const description = document.querySelector("meta[name='description']").content;
    // const us_total = description.match(/(?<us_num>\d+)\sconfirmed cases in US/).groups['us_num'];
    // const ca_total = description.match(/(?<ca_num>\d+)\sconfirmed cases in Canada/).groups['ca_num'];
    
    const update_time = description.match(/(?<update_time>\d{4}-\d{2}-\d{2} \d{2}:\d{2})/).groups['update_time'];

    /**
     * Parse the numbers of cases in both US and CA
     * daily new, total, recovered, deaths
     */
    const daily_update_info = document.querySelectorAll("#stat > div.row > div.tag");
    const us_daily_update_info = daily_update_info[0].childNodes;
    const us_daily_update_info_json = {
        "us_daily_add_new": us_daily_update_info[1].childNodes[0].childNodes[0].childNodes[1].textContent,
        "us_total": us_daily_update_info[1].childNodes[0].childNodes[1].textContent,
        "us_total_recovered": us_daily_update_info[1].childNodes[1].childNodes[0].textContent,
        "us_daily_deaths_new": us_daily_update_info[1].childNodes[2].childNodes[0].childNodes[1].textContent,
        "us_total_deaths": us_daily_update_info[1].childNodes[2].childNodes[1].textContent,
    };

    const ca_daily_update_info = daily_update_info[1].childNodes;
    const ca_daily_update_info_json = {
        "ca_daily_add_new": ca_daily_update_info[1].childNodes[0].childNodes[0].childNodes[1].textContent,
        "ca_total": ca_daily_update_info[1].childNodes[0].childNodes[1].textContent,
        "ca_total_recovered": ca_daily_update_info[1].childNodes[1].childNodes[0].textContent,
        "ca_daily_deaths_new": ca_daily_update_info[1].childNodes[2].childNodes[0].childNodes[1].textContent,
        "ca_total_deaths": ca_daily_update_info[1].childNodes[2].childNodes[1].textContent,
    };

    /**
     * Parse the numbers of US states
     * confirmed, deaths, case fatality rate
     */
    const state_detail = document.querySelectorAll("#map > div.tab-container > div.active > div.state-table > div > div.row");
    const state_json = {};
    state_detail.forEach(nodeList => {
        const span_nodes = nodeList.childNodes;
        const states_zh = span_nodes[0].textContent;
        const states_en = states.states[states_zh]
        state_json[!states_en ? states_zh : states_en.en] = {
            confirmed: span_nodes[1].textContent,
            deaths: span_nodes[2].textContent,
            daeath_rate: span_nodes[3].textContent,
            // source: span_nodes[4].querySelector('div > a') ? span_nodes[4].querySelector('div > a').getAttribute('href') : '',
            source: span_nodes[4].innerHTML,
            isSOE: !!span_nodes[0].querySelector('i'),
        };
    });
    
    return reply.view('covid19', 
    { 
        title : title, 
        description: description,
        update_time: update_time,
        state_json: state_json,
        us_daily_update_info_json,
        ca_daily_update_info_json,
    });
};

const states_name_convertor = () => {

};

const covid19 = [
    {
        method: 'GET',
        path: '/api/covid19/{locale?}',   
        handler: fetch_covid19_data,
    }
];

export { covid19 };