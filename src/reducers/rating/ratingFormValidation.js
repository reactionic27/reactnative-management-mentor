/**
 * # ratingFormValidation.js
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
 * As there are only two fields, the form is valid if they are
 */
export default function formValidation(state) {
    if (state.form.fields.productivity != null
        &&
        state.form.fields.enthusiasm !== null
        &&
        (
            state.form.fields.productivity != state.form.originalRecord.productivity
            ||
            state.form.fields.enthusiasm != state.form.originalRecord.enthusiasm
        )
    ) {
        return state.setIn(['form', 'isValid'], true);
    } else {
        return state.setIn(['form', 'isValid'], false);
    }
}










