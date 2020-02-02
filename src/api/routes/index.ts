'use strict';

import * as hapi from '@hapi/hapi';
import { wuhan } from './wuhan';

export const routes = [
    ...wuhan
];