/**
 * # profileReducer.js
 *
 * The reducer user profile actions
 */
'use strict';

/**
 * ## Imports
 *
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const fieldValidation = require('../../lib/fieldValidation').default;
const formValidation = require('./profileFormValidation').default;
const {fromJS} = require('immutable');

/**
 * ## Actions
 *
 */
const {
    ON_PROFILE_FORM_FIELD_CHANGE,
    SET_PROFILE_FORM_FIRST_TIME,

    DELETE_PROFILE_REQUEST,

    GET_LOCAL_PROFILE_REQUEST,
    GET_LOCAL_PROFILE_SUCCESS,
    GET_LOCAL_PROFILE_BLANK_JSON,
    GET_LOCAL_PROFILE_FAILURE,

    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,

    LOCAL_PROFILE_UPDATE_REQUEST,
    LOCAL_PROFILE_UPDATE_SUCCESS,
    LOCAL_PROFILE_UPDATE_FAILURE,

    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAILURE,

    PROFILE_SYNC_REQUEST,
    PROFILE_SYNC_SUCCESS,
    PROFILE_SYNC_FAILURE,

    LOADING_AVATAR_REQUEST,
    LOADING_AVATAR_SUCCESS,
    LOADING_AVATAR_FAILURE,

    LOGOUT_SUCCESS,

    SET_STATE
} = require('../../lib/constants').default;

/**
 * ## Initial State
 *
 */
const InitialState = require('./profileInitialState').default;
const initialState = new InitialState;

/**
 * ## profileReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function profileReducer(state = initialState, action) {
    let nextProfileState = null;

    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

    switch (action.type) {
        /**
         * ### Request starts
         * set the form to fetching and clear any errors
         */
        case GET_LOCAL_PROFILE_REQUEST:
        case GET_PROFILE_REQUEST:
        case LOCAL_PROFILE_UPDATE_REQUEST:
        case PROFILE_UPDATE_REQUEST:
            // console.log(action);
            return state
                .setIn(['form', 'isFetching'], true)
                .setIn(['form', 'error'], null);

        /**
         * ### Request end successfully
         * set the form to fetching as done
         */
        case LOCAL_PROFILE_UPDATE_SUCCESS:
            // console.log(action);
            return state;

        case PROFILE_UPDATE_SUCCESS:
            // console.log(action);
            return state
                .setIn(['form', 'isFetching'], false);

        /**
         * ### Request ends successfully
         *
         * the fetching is done, set the UI fields and the originalProfile
         *
         * Validate the data to make sure it's all good and someone didn't
         * mung it up through some other mechanism
         */
        case GET_LOCAL_PROFILE_SUCCESS:
            // console.log(action);
            nextProfileState = state
                .set('acceptTerms', action.payload.acceptTerms)
                .set('createdAt', action.payload.createdAt)
                .set('id', action.payload.id)
                .set('isActive', action.payload.isActive)
                .set('provider', action.payload.provider)
                .set('role', action.payload.role)
                .set('uid', action.payload.uid)
                .set('updatedAt', action.payload.updatedAt)
                .set('iLeader', action.payload.iLeader)
                .set('member', action.payload.member)

                .set('myILeader', fromJS(action.payload.myILeader))

                .set('members', fromJS(action.payload.members))

                .set('ratingHistory', fromJS(action.payload.ratingHistory));

            if (action.payload.team !== undefined) {
                nextProfileState
                    .setIn(['team', 'id'], action.payload.team.id)
                    .setIn(['team', 'uuid'], action.payload.team.uuid)
                    .setIn(['team', 'position'], action.payload.team.position)
                    .setIn(['team', 'name'], action.payload.team.name)
                    .setIn(['team', 'iLeaderId'], action.payload.team.iLeaderId)
                    .setIn(['team', 'createdAt'], action.payload.team.createdAt)
                    .setIn(['team', 'updatedAt'], action.payload.team.updatedAt);
            }

            if (action.payload.organisation !== undefined) {
                nextProfileState
                    .setIn(['organisation', 'id'], action.payload.organisation.id)
                    .setIn(['organisation', 'uuid'], action.payload.organisation.uuid)
                    .setIn(['organisation', 'name'], action.payload.organisation.name)
                    .setIn(['organisation', 'hq'], action.payload.organisation.hq)
                    .setIn(['organisation', 'town'], action.payload.organisation.town)
                    .setIn(['organisation', 'county'], action.payload.organisation.county)
                    .setIn(['organisation', 'sector'], action.payload.organisation.sector)
                    .setIn(['organisation', 'country'], action.payload.organisation.country)
                    .setIn(['organisation', 'postcode'], action.payload.organisation.postcode)
                    .setIn(['organisation', 'addressLine1'], action.payload.organisation.addressLine1)
                    .setIn(['organisation', 'addressLine2'], action.payload.organisation.addressLine2)
                    .setIn(['organisation', 'createdAt'], action.payload.organisation.createdAt)
                    .setIn(['organisation', 'updatedAt'], action.payload.organisation.updatedAt)
                    .setIn(['organisation', 'logo'], action.payload.organisation.logo)

                    .setIn(['organisation', 'appConfig', 'id'], action.payload.organisation.appConfig.id)
                    .setIn(['organisation', 'appConfig', 'enthusiasmMax'], action.payload.organisation.appConfig.enthusiasmMax)
                    .setIn(['organisation', 'appConfig', 'enthusiasmMin'], action.payload.organisation.appConfig.enthusiasmMin)
                    .setIn(['organisation', 'appConfig', 'enthusiasmFirstTertileGreatestUpperBound'], action.payload.organisation.appConfig.enthusiasmFirstTertileGreatestUpperBound)
                    .setIn(['organisation', 'appConfig', 'enthusiasmSecondTertileGreatestUpperBound'], action.payload.organisation.appConfig.enthusiasmSecondTertileGreatestUpperBound)
                    .setIn(['organisation', 'appConfig', 'productivityMax'], action.payload.organisation.appConfig.productivityMax)
                    .setIn(['organisation', 'appConfig', 'productivityMin'], action.payload.organisation.appConfig.productivityMin)
                    .setIn(['organisation', 'appConfig', 'productivityFirstTertileGreatestUpperBound'], action.payload.organisation.appConfig.productivityFirstTertileGreatestUpperBound)
                    .setIn(['organisation', 'appConfig', 'productivitySecondTertileGreatestUpperBound'], action.payload.organisation.appConfig.productivitySecondTertileGreatestUpperBound)
                    .setIn(['organisation', 'appConfig', 'primaryColour'], action.payload.organisation.appConfig.primaryColour)
                    .setIn(['organisation', 'appConfig', 'secondaryColour'], action.payload.organisation.appConfig.secondaryColour)

                    .setIn(['organisation', 'appConfig', 'decisionMatrixOverall1'], action.payload.organisation.appConfig.decisionMatrixOverall1)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixOverall2'], action.payload.organisation.appConfig.decisionMatrixOverall2)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixOverall3'], action.payload.organisation.appConfig.decisionMatrixOverall3)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixOverall4'], action.payload.organisation.appConfig.decisionMatrixOverall4)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity1'], action.payload.organisation.appConfig.decisionMatrixProductivity1)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity2'], action.payload.organisation.appConfig.decisionMatrixProductivity2)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity3'], action.payload.organisation.appConfig.decisionMatrixProductivity3)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity4'], action.payload.organisation.appConfig.decisionMatrixProductivity4)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity5'], action.payload.organisation.appConfig.decisionMatrixProductivity5)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity6'], action.payload.organisation.appConfig.decisionMatrixProductivity6)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity7'], action.payload.organisation.appConfig.decisionMatrixProductivity7)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm1'], action.payload.organisation.appConfig.decisionMatrixEnthusiasm1)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm2'], action.payload.organisation.appConfig.decisionMatrixEnthusiasm2)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm3'], action.payload.organisation.appConfig.decisionMatrixEnthusiasm3)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm4'], action.payload.organisation.appConfig.decisionMatrixEnthusiasm4)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm5'], action.payload.organisation.appConfig.decisionMatrixEnthusiasm5)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm6'], action.payload.organisation.appConfig.decisionMatrixEnthusiasm6)
                    .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm7'], action.payload.organisation.appConfig.decisionMatrixEnthusiasm7);
            }

            nextProfileState
                .setIn(['form', 'originalProfile', 'email'], action.payload.email)
                .setIn(['form', 'originalProfile', 'firstName'], action.payload.firstName)
                .setIn(['form', 'originalProfile', 'lastName'], action.payload.lastName)
                .setIn(['form', 'originalProfile', 'age'], action.payload.age)
                .setIn(['form', 'originalProfile', 'gender'], action.payload.gender)
                .setIn(['form', 'originalProfile', 'nationality'], action.payload.nationality)
                .setIn(['form', 'originalProfile', 'avatar'], action.payload.avatar)
                .setIn(['form', 'originalProfile', 'title'], action.payload.title)

                .setIn(['form', 'fields', 'email'], action.payload.email)
                .setIn(['form', 'fields', 'firstName'], action.payload.firstName)
                .setIn(['form', 'fields', 'lastName'], action.payload.lastName)
                .setIn(['form', 'fields', 'age'], action.payload.age)
                .setIn(['form', 'fields', 'gender'], action.payload.gender)
                .setIn(['form', 'fields', 'nationality'], action.payload.nationality)
                .setIn(['form', 'fields', 'avatar'], action.payload.avatar)
                .setIn(['form', 'fields', 'title'], action.payload.title)

                .setIn(['form', 'error'], null);

            return formValidation(
                fieldValidation(nextProfileState, action)
                , action);

        case GET_PROFILE_SUCCESS:
            // console.log(action);
            nextProfileState = state
                .setIn(['form', 'isFetching'], false)

                .set('acceptTerms', action.payload.acceptTerms)
                .set('createdAt', action.payload.createdAt)
                .set('id', action.payload.id)
                .set('isActive', action.payload.isActive)
                .set('provider', action.payload.provider)
                .set('role', action.payload.role)
                .set('uid', action.payload.uid)
                .set('updatedAt', action.payload.updatedAt)
                .set('iLeader', action.payload.iLeader)
                .set('member', action.payload.member)

                .set('myILeader', fromJS(action.payload.myILeader))

                .set('members', fromJS(action.payload.members))

                .set('ratingHistory', fromJS(action.payload.ratingHistory))

                .setIn(['team', 'id'], action.payload.team.id)
                .setIn(['team', 'uuid'], action.payload.team.uuid)
                .setIn(['team', 'position'], action.payload.team.position)
                .setIn(['team', 'name'], action.payload.team.name)
                .setIn(['team', 'iLeaderId'], action.payload.team.iLeaderId)
                .setIn(['team', 'createdAt'], action.payload.team.createdAt)
                .setIn(['team', 'updatedAt'], action.payload.team.updatedAt)

                .setIn(['organisation', 'id'], action.payload.organisation.id)
                .setIn(['organisation', 'uuid'], action.payload.organisation.uuid)
                .setIn(['organisation', 'name'], action.payload.organisation.name)
                .setIn(['organisation', 'hq'], action.payload.organisation.hq)
                .setIn(['organisation', 'town'], action.payload.organisation.town)
                .setIn(['organisation', 'county'], action.payload.organisation.county)
                .setIn(['organisation', 'sector'], action.payload.organisation.sector)
                .setIn(['organisation', 'country'], action.payload.organisation.country)
                .setIn(['organisation', 'postcode'], action.payload.organisation.postcode)
                .setIn(['organisation', 'addressLine1'], action.payload.organisation.addressLine1)
                .setIn(['organisation', 'addressLine2'], action.payload.organisation.addressLine2)
                .setIn(['organisation', 'createdAt'], action.payload.organisation.createdAt)
                .setIn(['organisation', 'updatedAt'], action.payload.organisation.updatedAt)
                .setIn(['organisation', 'logo'], action.payload.organisation.logo)

                .setIn(['organisation', 'appConfig', 'id'], action.payload.organisation.appConfig.id)
                .setIn(['organisation', 'appConfig', 'enthusiasmMax'], action.payload.organisation.appConfig.enthusiasmMax)
                .setIn(['organisation', 'appConfig', 'enthusiasmMin'], action.payload.organisation.appConfig.enthusiasmMin)
                .setIn(['organisation', 'appConfig', 'enthusiasmFirstTertileGreatestUpperBound'], action.payload.organisation.appConfig.enthusiasmFirstTertileGreatestUpperBound)
                .setIn(['organisation', 'appConfig', 'enthusiasmSecondTertileGreatestUpperBound'], action.payload.organisation.appConfig.enthusiasmSecondTertileGreatestUpperBound)
                .setIn(['organisation', 'appConfig', 'productivityMax'], action.payload.organisation.appConfig.productivityMax)
                .setIn(['organisation', 'appConfig', 'productivityMin'], action.payload.organisation.appConfig.productivityMin)
                .setIn(['organisation', 'appConfig', 'productivityFirstTertileGreatestUpperBound'], action.payload.organisation.appConfig.productivityFirstTertileGreatestUpperBound)
                .setIn(['organisation', 'appConfig', 'productivitySecondTertileGreatestUpperBound'], action.payload.organisation.appConfig.productivitySecondTertileGreatestUpperBound)
                .setIn(['organisation', 'appConfig', 'primaryColour'], action.payload.organisation.appConfig.primaryColour)
                .setIn(['organisation', 'appConfig', 'secondaryColour'], action.payload.organisation.appConfig.secondaryColour)

                .setIn(['organisation', 'appConfig', 'decisionMatrixOverall1'], action.payload.organisation.appConfig.decisionMatrixOverall1)
                .setIn(['organisation', 'appConfig', 'decisionMatrixOverall2'], action.payload.organisation.appConfig.decisionMatrixOverall2)
                .setIn(['organisation', 'appConfig', 'decisionMatrixOverall3'], action.payload.organisation.appConfig.decisionMatrixOverall3)
                .setIn(['organisation', 'appConfig', 'decisionMatrixOverall4'], action.payload.organisation.appConfig.decisionMatrixOverall4)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity1'], action.payload.organisation.appConfig.decisionMatrixProductivity1)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity2'], action.payload.organisation.appConfig.decisionMatrixProductivity2)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity3'], action.payload.organisation.appConfig.decisionMatrixProductivity3)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity4'], action.payload.organisation.appConfig.decisionMatrixProductivity4)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity5'], action.payload.organisation.appConfig.decisionMatrixProductivity5)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity6'], action.payload.organisation.appConfig.decisionMatrixProductivity6)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity7'], action.payload.organisation.appConfig.decisionMatrixProductivity7)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm1'], action.payload.organisation.appConfig.decisionMatrixEnthusiasm1)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm2'], action.payload.organisation.appConfig.decisionMatrixEnthusiasm2)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm3'], action.payload.organisation.appConfig.decisionMatrixEnthusiasm3)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm4'], action.payload.organisation.appConfig.decisionMatrixEnthusiasm4)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm5'], action.payload.organisation.appConfig.decisionMatrixEnthusiasm5)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm6'], action.payload.organisation.appConfig.decisionMatrixEnthusiasm6)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm7'], action.payload.organisation.appConfig.decisionMatrixEnthusiasm7)

                .setIn(['form', 'originalProfile', 'email'], action.payload.email)
                .setIn(['form', 'originalProfile', 'firstName'], action.payload.firstName)
                .setIn(['form', 'originalProfile', 'lastName'], action.payload.lastName)
                .setIn(['form', 'originalProfile', 'age'], action.payload.age)
                .setIn(['form', 'originalProfile', 'gender'], action.payload.gender)
                .setIn(['form', 'originalProfile', 'nationality'], action.payload.nationality)
                .setIn(['form', 'originalProfile', 'avatar'], action.payload.avatar)
                .setIn(['form', 'originalProfile', 'title'], action.payload.title)

                .setIn(['form', 'fields', 'email'], action.payload.email)
                .setIn(['form', 'fields', 'firstName'], action.payload.firstName)
                .setIn(['form', 'fields', 'lastName'], action.payload.lastName)
                .setIn(['form', 'fields', 'age'], action.payload.age)
                .setIn(['form', 'fields', 'gender'], action.payload.gender)
                .setIn(['form', 'fields', 'nationality'], action.payload.nationality)
                .setIn(['form', 'fields', 'avatar'], action.payload.avatar)
                .setIn(['form', 'fields', 'title'], action.payload.title)

                .setIn(['form', 'error'], null);

            return formValidation(
                fieldValidation(nextProfileState, action)
                , action);

        /**
         * User logged out, so reset form fields and original profile.
         *
         */
        case LOGOUT_SUCCESS:
            nextProfileState = state
                .set('acceptTerms', null)
                .set('createdAt', null)
                .set('id', null)
                .set('isActive', null)
                .set('provider', null)
                .set('role', null)
                .set('uid', null)
                .set('updatedAt', null)
                .set('iLeader', null)
                .set('member', null)

                .set('myILeader', fromJS({}))

                .set('members', fromJS([]))

                .set('ratingHistory', fromJS({}))

                .setIn(['team', 'id'], null)
                .setIn(['team', 'uuid'], null)
                .setIn(['team', 'position'], null)
                .setIn(['team', 'name'], null)
                .setIn(['team', 'iLeaderId'], null)
                .setIn(['team', 'createdAt'], null)
                .setIn(['team', 'updatedAt'], null)

                .setIn(['organisation', 'id'], null)
                .setIn(['organisation', 'uuid'], null)
                .setIn(['organisation', 'name'], null)
                .setIn(['organisation', 'hq'], null)
                .setIn(['organisation', 'town'], null)
                .setIn(['organisation', 'county'], null)
                .setIn(['organisation', 'sector'], null)
                .setIn(['organisation', 'country'], null)
                .setIn(['organisation', 'postcode'], null)
                .setIn(['organisation', 'addressLine1'], null)
                .setIn(['organisation', 'addressLine2'], null)
                .setIn(['organisation', 'createdAt'], null)
                .setIn(['organisation', 'updatedAt'], null)
                .setIn(['organisation', 'logo'], null)

                .setIn(['organisation', 'appConfig', 'id'], null)
                .setIn(['organisation', 'appConfig', 'enthusiasmMax'], null)
                .setIn(['organisation', 'appConfig', 'enthusiasmMin'], null)
                .setIn(['organisation', 'appConfig', 'enthusiasmFirstTertileGreatestUpperBound'], null)
                .setIn(['organisation', 'appConfig', 'enthusiasmSecondTertileGreatestUpperBound'], null)
                .setIn(['organisation', 'appConfig', 'productivityMax'], null)
                .setIn(['organisation', 'appConfig', 'productivityMin'], null)
                .setIn(['organisation', 'appConfig', 'productivityFirstTertileGreatestUpperBound'], null)
                .setIn(['organisation', 'appConfig', 'productivitySecondTertileGreatestUpperBound'], null)
                .setIn(['organisation', 'appConfig', 'primaryColour'], null)
                .setIn(['organisation', 'appConfig', 'secondaryColour'], null)

                .setIn(['organisation', 'appConfig', 'decisionMatrixOverall1'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixOverall2'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixOverall3'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixOverall4'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity1'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity2'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity3'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity4'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity5'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity6'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity7'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm1'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm2'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm3'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm4'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm5'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm6'], null)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm7'], null)

                .setIn(['form', 'originalProfile', 'email'], null)
                .setIn(['form', 'originalProfile', 'firstName'], null)
                .setIn(['form', 'originalProfile', 'lastName'], null)
                .setIn(['form', 'originalProfile', 'age'], null)
                .setIn(['form', 'originalProfile', 'gender'], null)
                .setIn(['form', 'originalProfile', 'nationality'], null)
                .setIn(['form', 'originalProfile', 'avatar'], null)
                .setIn(['form', 'originalProfile', 'title'], null)

                .setIn(['form', 'fields', 'email'], '')
                .setIn(['form', 'fields', 'firstName'], '')
                .setIn(['form', 'fields', 'lastName'], '')
                .setIn(['form', 'fields', 'age'], '')
                .setIn(['form', 'fields', 'gender'], '')
                .setIn(['form', 'fields', 'nationality'], '')
                .setIn(['form', 'fields', 'avatar'], '')
                .setIn(['form', 'fields', 'title'], '')

                .setIn(['form', 'error'], null);
            return formValidation(nextProfileState, action);

        /**
         * ### Request fails
         * we're done fetching and the error needs to be displayed to the user
         */
        case GET_LOCAL_PROFILE_FAILURE:
        case GET_PROFILE_FAILURE:
        case PROFILE_UPDATE_FAILURE:
        case LOCAL_PROFILE_UPDATE_FAILURE:
            return state
                .setIn(['form', 'isFetching'], false)
                .setIn(['form', 'error'], action.payload);

        /**
         * ### form fields have changed
         *
         * Set the state with the fields, clear the form error
         * and perform field and form validation
         */
        case ON_PROFILE_FORM_FIELD_CHANGE:
        {
            const {field, value} = action.payload;
            let nextState = state
                .setIn(['form', 'fields', field], value)
                .setIn(['form', 'error'], null);

            return formValidation(
                fieldValidation(nextState, action),
                action
            );
        }

        /**
         * ### Form appears after login
         */
        case SET_PROFILE_FORM_FIRST_TIME:
        {
            const bool = action.payload;
            return state
                .set('firstTime', bool);
        }

        /**
         * ### Sync interval is in effect and not been cleared
         */
        case PROFILE_SYNC_REQUEST:
            return state
                .setIn(['form', 'isSyncing'], true);

        case PROFILE_SYNC_SUCCESS:
        case PROFILE_SYNC_FAILURE:
            return state
                .setIn(['form', 'isSyncing'], false);

        /**
         * ### Avatar has been chosen and not yet appeared in preview
         */
        case LOADING_AVATAR_REQUEST:
            return state
                .setIn(['form', 'isLoadingAvatar'], true);

        case LOADING_AVATAR_SUCCESS:
        case LOADING_AVATAR_FAILURE:
            return state
                .setIn(['form', 'isLoadingAvatar'], false);

        /**
         * no state change, just an ability to track action requests...
         */
        case GET_LOCAL_PROFILE_BLANK_JSON:
        case DELETE_PROFILE_REQUEST:
            return state;

        /**
         * ### set the state
         *
         * This is in support of Hot Loading - take the payload
         * and set the values into the state
         *
         */
        case SET_STATE:
            debugger;
            var profile = JSON.parse(action.payload).profile.form;
            var next = state
                .setIn(['form', 'disabled'], profile.disabled)
                .setIn(['form', 'error'], profile.error)
                .setIn(['form', 'isValid'], profile.isValid)
                .setIn(['form', 'isFetching'], profile.isFetching)
                .setIn(['form', 'isSyncing'], profile.isSyncing)
                .setIn(['form', 'isLoadingAvatar'], profile.isLoadingAvatar)

                .set('acceptTerms', profile.originalProfile.acceptTerms)
                .set('createdAt', profile.originalProfile.createdAt)
                .set('id', profile.originalProfile.id)
                .set('isActive', profile.originalProfile.isActive)
                .set('provider', profile.originalProfile.provider)
                .set('role', profile.originalProfile.role)
                .set('uid', profile.originalProfile.uid)
                .set('updatedAt', profile.originalProfile.updatedAt)
                .set('iLeader', profile.originalProfile.iLeader)
                .set('member', profile.originalProfile.member)

                .set('myILeader', fromJS(profile.myILeader))

                .set('members', fromJS(profile.members))

                .set('ratingHistory', fromJS(profile.ratingHistory))

                .setIn(['team', 'id'], profile.team.id)
                .setIn(['team', 'uuid'], profile.team.uuid)
                .setIn(['team', 'position'], profile.team.position)
                .setIn(['team', 'name'], profile.team.name)
                .setIn(['team', 'iLeaderId'], profile.team.iLeaderId)
                .setIn(['team', 'createdAt'], profile.team.createdAt)
                .setIn(['team', 'updatedAt'], profile.team.updatedAt)

                .setIn(['organisation', 'id'], profile.organisation.id)
                .setIn(['organisation', 'uuid'], profile.organisation.uuid)
                .setIn(['organisation', 'name'], profile.organisation.name)
                .setIn(['organisation', 'hq'], profile.organisation.hq)
                .setIn(['organisation', 'town'], profile.organisation.town)
                .setIn(['organisation', 'county'], profile.organisation.county)
                .setIn(['organisation', 'sector'], profile.organisation.sector)
                .setIn(['organisation', 'country'], profile.organisation.country)
                .setIn(['organisation', 'postcode'], profile.organisation.postcode)
                .setIn(['organisation', 'addressLine1'], profile.organisation.addressLine1)
                .setIn(['organisation', 'addressLine2'], profile.organisation.addressLine2)
                .setIn(['organisation', 'createdAt'], profile.organisation.createdAt)
                .setIn(['organisation', 'updatedAt'], profile.organisation.updatedAt)
                .setIn(['organisation', 'logo'], profile.organisation.logo)

                .setIn(['organisation', 'appConfig', 'id'], profile.organisation.appConfig.id)
                .setIn(['organisation', 'appConfig', 'enthusiasmMax'], profile.organisation.appConfig.enthusiasmMax)
                .setIn(['organisation', 'appConfig', 'enthusiasmMin'], profile.organisation.appConfig.enthusiasmMin)
                .setIn(['organisation', 'appConfig', 'enthusiasmFirstTertileGreatestUpperBound'], profile.organisation.appConfig.enthusiasmFirstTertileGreatestUpperBound)
                .setIn(['organisation', 'appConfig', 'enthusiasmSecondTertileGreatestUpperBound'], profile.organisation.appConfig.enthusiasmSecondTertileGreatestUpperBound)
                .setIn(['organisation', 'appConfig', 'productivityMax'], profile.organisation.appConfig.productivityMax)
                .setIn(['organisation', 'appConfig', 'productivityMin'], profile.organisation.appConfig.productivityMin)
                .setIn(['organisation', 'appConfig', 'productivityFirstTertileGreatestUpperBound'], profile.organisation.appConfig.productivityFirstTertileGreatestUpperBound)
                .setIn(['organisation', 'appConfig', 'productivitySecondTertileGreatestUpperBound'], profile.organisation.appConfig.productivitySecondTertileGreatestUpperBound)
                .setIn(['organisation', 'appConfig', 'primaryColour'], profile.organisation.appConfig.primaryColour)
                .setIn(['organisation', 'appConfig', 'secondaryColour'], profile.organisation.appConfig.secondaryColour)

                .setIn(['organisation', 'appConfig', 'decisionMatrixOverall1'], profile.organisation.appConfig.decisionMatrixOverall1)
                .setIn(['organisation', 'appConfig', 'decisionMatrixOverall2'], profile.organisation.appConfig.decisionMatrixOverall2)
                .setIn(['organisation', 'appConfig', 'decisionMatrixOverall3'], profile.organisation.appConfig.decisionMatrixOverall3)
                .setIn(['organisation', 'appConfig', 'decisionMatrixOverall4'], profile.organisation.appConfig.decisionMatrixOverall4)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity1'], profile.organisation.appConfig.decisionMatrixProductivity1)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity2'], profile.organisation.appConfig.decisionMatrixProductivity2)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity3'], profile.organisation.appConfig.decisionMatrixProductivity3)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity4'], profile.organisation.appConfig.decisionMatrixProductivity4)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity5'], profile.organisation.appConfig.decisionMatrixProductivity5)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity6'], profile.organisation.appConfig.decisionMatrixProductivity6)
                .setIn(['organisation', 'appConfig', 'decisionMatrixProductivity7'], profile.organisation.appConfig.decisionMatrixProductivity7)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm1'], profile.organisation.appConfig.decisionMatrixEnthusiasm1)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm2'], profile.organisation.appConfig.decisionMatrixEnthusiasm2)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm3'], profile.organisation.appConfig.decisionMatrixEnthusiasm3)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm4'], profile.organisation.appConfig.decisionMatrixEnthusiasm4)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm5'], profile.organisation.appConfig.decisionMatrixEnthusiasm5)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm6'], profile.organisation.appConfig.decisionMatrixEnthusiasm6)
                .setIn(['organisation', 'appConfig', 'decisionMatrixEnthusiasm7'], profile.organisation.appConfig.decisionMatrixEnthusiasm7)

                .setIn(['form', 'originalProfile', 'email'], profile.originalProfile.email)
                .setIn(['form', 'originalProfile', 'firstName'], profile.originalProfile.firstName)
                .setIn(['form', 'originalProfile', 'lastName'], profile.originalProfile.lastName)
                .setIn(['form', 'originalProfile', 'age'], profile.originalProfile.age)
                .setIn(['form', 'originalProfile', 'gender'], profile.originalProfile.gender)
                .setIn(['form', 'originalProfile', 'nationality'], profile.originalProfile.nationality)
                .setIn(['form', 'originalProfile', 'avatar'], profile.originalProfile.avatar)
                .setIn(['form', 'originalProfile', 'title'], profile.originalProfile.title)

                .setIn(['form', 'fields', 'email'], profile.fields.email)
                .setIn(['form', 'fields', 'firstName'], profile.fields.firstName)
                .setIn(['form', 'fields', 'lastName'], profile.fields.lastName)
                .setIn(['form', 'fields', 'age'], profile.fields.age)
                .setIn(['form', 'fields', 'gender'], profile.fields.gender)
                .setIn(['form', 'fields', 'nationality'], profile.fields.nationality)
                .setIn(['form', 'fields', 'avatar'], profile.fields.avatar)
                .setIn(['form', 'fields', 'title'], profile.fields.title);
            return next;

    }//switch
    /**
     * # Default
     */
    return state;
}
