/**
 # profileInitialState.js
 *
 This class is a Immutable object
 Working *successfullywith Redux, requires
 state that is immutable.
 In my opinion, that can not be by convention
 By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';

const {Record, fromJS} = require('immutable');

/**
 ## Form
 This Record contains the state of the form and the
 fields it contains.
 *
 The originalProfile is what AMP provided and has the objectId
 The fields are what display on the UI
 */
const Form = Record({
    originalProfile: new (Record({
        // Editable
        email: null,
        firstName: '',
        lastName: '',
        age: null,
        gender: null,
        nationality: null,
        avatar: null,
        title: ''
    })),
    disabled: false,
    error: null,
    isValid: false,
    isFetching: false,
    isSyncing: false,
    isLoadingAvatar: false,
    fields: new (Record({
        email: '',
        emailHasError: false,
        firstName: '',
        firstNameHasError: false,
        lastName: '',
        lastNameHasError: false,
        age: '',
        gender: '',
        nationality: '',
        avatar: '',
        title: ''
    }))
});

const Team = Record({
    id: null,
    uuid: null,
    position: null,
    name: null,
    iLeaderId: null,
    createdAt: null,
    updatedAt: null
});

const Organisation = Record({
    id: null,
    uuid: null,
    name: null,
    hq: null,
    town: null,
    county: null,
    sector: null,
    country: null,
    postcode: null,
    addressLine1: null,
    addressLine2: null,
    createdAt: null,
    updatedAt: null,
    logo: null,
    appConfig: new (Record({
        id: null,
        enthusiasmMax: null,
        enthusiasmMin: null,
        enthusiasmFirstTertileGreatestUpperBound: null,
        enthusiasmSecondTertileGreatestUpperBound: null,
        productivityMax: null,
        productivityMin: null,
        productivityFirstTertileGreatestUpperBound: null,
        productivitySecondTertileGreatestUpperBound: null,
        primaryColour: null,
        secondaryColour: null,
        decisionMatrixOverall1: null,
        decisionMatrixOverall2: null,
        decisionMatrixOverall3: null,
        decisionMatrixOverall4: null,
        decisionMatrixProductivity1: null,
        decisionMatrixProductivity2: null,
        decisionMatrixProductivity3: null,
        decisionMatrixProductivity4: null,
        decisionMatrixProductivity5: null,
        decisionMatrixProductivity6: null,
        decisionMatrixProductivity7: null,
        decisionMatrixEnthusiasm1: null,
        decisionMatrixEnthusiasm2: null,
        decisionMatrixEnthusiasm3: null,
        decisionMatrixEnthusiasm4: null,
        decisionMatrixEnthusiasm5: null,
        decisionMatrixEnthusiasm6: null,
        decisionMatrixEnthusiasm7: null
    }))
});


var InitialState = Record({
    firstTime: false,
    form: new Form,
    // Reference
    acceptTerms: null,
    createdAt: null,
    id: null,
    isActive: null,
    provider: null,
    role: null,
    uid: null,
    updatedAt: null,
    iLeader: null,
    member: null,
    myILeader: fromJS({}),
    members: fromJS([]),
    ratingHistory: fromJS({}),
    team: new Team,
    organisation: new Organisation
});

export default InitialState;
