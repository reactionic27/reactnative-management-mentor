/**
 * # reducers
 *
 * This class combines all the reducers into one
 *
 */
'use strict';
/**
 * ## Imports
 *
 * our 4 reducers
 */
import auth from './auth/authReducer';
import device from './device/deviceReducer';
import global from './global/globalReducer';
import profile from './profile/profileReducer';
import rating from './rating/ratingReducer';
import toolsList from './toolsList/toolsListReducer';
import toolSavesList from './toolSavesList/toolSavesListReducer';
import tool from './tool/toolReducer';
import appHistory from './appHistory/appHistoryReducer';
import routes from './routes/routes';

import { combineReducers } from 'redux';

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
    auth,
    device,
    global,
    profile,
    rating,
    toolsList,
    toolSavesList,
    tool,
    appHistory,
    routes,
});

export default rootReducer;
