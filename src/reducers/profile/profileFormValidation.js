/**
 * # profileFormValidation.js
 *
 * This class determines only if the form is valid
 * so that the form button can be enabled.
 * if all the fields on the form are without error,
 * the form is considered valid
 */
'use strict';

/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 *
 * As there are only six fields, the form is valid if they are
 */
export default function formValidation(state) {
    if (state.form.fields.email != ''
        &&
        state.form.fields.firstName !== ''
        &&
        state.form.fields.lastName !== ''
        &&
        state.form.fields.age != ''
        &&
        state.form.fields.gender !== ''
        &&
        state.form.fields.nationality !== ''
        &&
        state.form.fields.avatar !== ''
        && !state.form.fields.emailHasError
        && !state.form.fields.firstNameHasError
        && !state.form.fields.lastNameHasError
        &&
        (
            state.firstTime
            ||
            (
                state.form.fields.email != state.form.originalProfile.email
                ||
                state.form.fields.firstName != state.form.originalProfile.firstName
                ||
                state.form.fields.lastName != state.form.originalProfile.lastName
                ||
                state.form.fields.age != state.form.originalProfile.age
                ||
                state.form.fields.gender != state.form.originalProfile.gender
                ||
                state.form.fields.nationality != state.form.originalProfile.nationality
                ||
                state.form.fields.avatar != state.form.originalProfile.avatar
            )
        )
    ) {
        return state.setIn(['form', 'isValid'], true);
    } else {
        return state.setIn(['form', 'isValid'], false);
    }

    return state;

}










