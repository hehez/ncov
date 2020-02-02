'use strict';

import * as Hapi    from '@hapi/hapi';
import * as Wreck   from '@hapi/wreck';

const BASE_URI              = 'https://view.inews.qq.com/g2/getOnsInfo?name=';

// APIs parameters
const WUWEI_WW_GLOBAL_VARS  = 'wuwei_ww_global_vars';
const DISEASE_H5            = 'disease_h5';

const wuwei_ww_global_vars = async () => {
    const uri = BASE_URI + WUWEI_WW_GLOBAL_VARS;
    const { payload } = await Wreck.get(uri, { json: true });
    const json = JSON.parse(payload.data);
    return json;
};

const disease_h5 = async () => {
    const uri = BASE_URI + DISEASE_H5;
    const { payload } = await Wreck.get(uri, { json: true });
    const json = JSON.parse(payload.data);
    return json;
}

const wuhan = [
    {
        method: 'GET',
        path: '/api/wuhan',
        config: {
            pre: [
                { method: wuwei_ww_global_vars, assign: 'data_wuwei_ww_global_vars' }
            ]
        },
        handler: async (request, h) => {
            return request.render('wuhan.2019.ncov.html', { title: 'hello', total: request.pre.data_wuwei_ww_global_vars });
        },
    },
    {
        method: 'GET',
        path: '/api/wuhan/1',   
        handler: wuwei_ww_global_vars,
    },
    {
        method: 'GET',
        path: '/api/wuhan/2',   
        handler: async (request, h) => {
            const uri = BASE_URI + 'wuwei_ww_time_line';
            const { payload } = await Wreck.get(uri, { json: true });
            const json = JSON.parse(payload.data);
            json.sort((a, b) => Date.parse(b.time) - Date.parse(a.time));
            return h.response(json);
        },
    },
    {
        method: 'GET',
        path: '/api/wuhan/3',   
        handler: async (request, h) => {
            const uri = BASE_URI + 'wuwei_ww_cn_day_counts';
            const { payload } = await Wreck.get(uri, { json: true });
            const json = JSON.parse(payload.data);
            json.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
            return h.response(json);
        },
    },
    {
        method: 'GET',
        path: '/api/wuhan/4',   
        handler: async (request, h) => {
            const uri = BASE_URI + 'wuwei_ww_area_counts';
            const { payload } = await Wreck.get(uri, { json: true });
            const json = JSON.parse(payload.data);
            return h.response(json);
        },
    },
    {
        method: 'GET',
        path: '/api/wuhan/5',   
        handler: async (request, h) => {
            const uri = BASE_URI + 'wuwei_ww_area_adds';
            const { payload } = await Wreck.get(uri, { json: true });
            const json = JSON.parse(payload.data);
            return h.response(json);
        },
    },
    {
        method: 'GET',
        path: '/api/wuhan/6',   
        handler: disease_h5,
    },
    {
        method: 'GET',
        path: '/api/wuhan/7',   
        handler: async (request, h) => {
            const uri = BASE_URI + 'wuwei_ww_lie_infos';
            const { payload } = await Wreck.get(uri, { json: true });
            const json = JSON.parse(payload.data);
            return h.response(json);
        },
    }
];

export { wuhan };