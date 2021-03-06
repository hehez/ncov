'use strict';

import { JSDOM } from 'jsdom';
import * as fetch from 'node-fetch';
import * as states from '../../../config/locales/states-mapping.json';

import { fetch_covid19_test_state_current_data } from './covidtracking';

const BASE_URI = 'https://coronavirus.1point3acres.com/';

export const fetch_covid19_data = async (request, reply) => {
    
    const locale = request.params.locale || 'en';
    const uri = BASE_URI + locale;

    /**
     * Switch Wrech over to node-fetch
     */
    const res = await fetch(uri);
    const payload = await res.text();
    
    const { document } = new JSDOM(payload.toString()).window;
    const title = 'COVID-19/Coronavirus Real Time Updates';
    
    const description = document.querySelector("meta[name='description']").content;

    /**
     * Last updated at:
     */
    const update_time = document.querySelector("#stat > h2 > div.subtitle > span.due").textContent;

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
    for (const nodeList of state_detail) {
        const span_nodes = nodeList.childNodes;
        const states_zh = span_nodes[0].textContent.trimEnd();
        const states_en = states.states[states_zh];

        const test_tracking_json = await fetch_covid19_test_state_current_data(states_en.abbr);
        test_tracking_json['testRate'] = (test_tracking_json['positive'] / test_tracking_json['total']).toFixed(2);
        const state_confirmed_info = span_nodes[1].childNodes;
        const state_deaths_info = span_nodes[2].childNodes;

        state_json[!states_en ? states_zh : states_en.en] = {
            state_daily_confirmed: state_confirmed_info.length == 1 ? state_confirmed_info[0].textContent : state_confirmed_info[1].textContent,
            state_daily_confirmed_new: state_confirmed_info.length == 1 ? '' : state_confirmed_info[0].textContent,
            state_daily_deaths: state_deaths_info.length == 1 ? state_deaths_info[0].textContent : state_deaths_info[1].textContent,
            state_daily_deaths_new: state_deaths_info.length == 1 ? '' : state_deaths_info[0].textContent,
            daeath_rate: span_nodes[3].textContent,
            source: span_nodes[4].innerHTML,
            isSOE: !!span_nodes[0].querySelector('i'),
            test: test_tracking_json,
        };
    };
    
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