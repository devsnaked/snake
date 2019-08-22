import { Map } from 'immutable';

export default function formReducer(state = Map({}), action) {
    switch (action.type) {
        case "SET_ERR_MAP":
            return action.map;
        default:
            return state;
    }
}