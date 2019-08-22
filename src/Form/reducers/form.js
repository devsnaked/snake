import { Map } from 'immutable';

export default function formReducer(state = Map({}), action) {
    switch (action.type) {
        case "UPDATE_FIELD":
            const { field, value } = action
            return state.set(field, value)
        case "SET_FORM_STATE":
            const { data } = action
            return new Map(data)
        default:
            return state;
    }
}