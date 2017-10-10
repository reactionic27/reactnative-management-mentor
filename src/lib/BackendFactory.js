/**
 * # BackendFactory.js
 *
 * This function returns a new instance of the Backend::Amp class
 *
 */
'use strict';

import CONFIG from './config';
import Amp from './Amp';

export default function BackendFactory(token = null) {

    if (CONFIG.backend.amp) {

        return new Amp(token);
    }
}
