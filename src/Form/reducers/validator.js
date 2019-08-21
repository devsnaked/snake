import { Map } from 'immutable';

export default function formReducer(state = Map({}), action) {
    switch (action.type) {
        case "UPDATE_FIELD_MESSAGE":
            const { field, message } = action
            return state.set(field, message)
        default:
            return state;
    }
}