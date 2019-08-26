import { Map, List } from 'immutable';

export default function formReducer(state = Map({}), action) {
    switch (action.type) {
        case "UPDATE_FIELD":
            let { field, value } = action
            return state.set(field, value)
        case "SET_FORM_STATE":
            let { data } = action
            return new Map(data)
        case 'UPDATE_FIELD_MULTI_SELECT':
            return updateMultiSelectList(state, action)
        default:
            return state;
    }
}


function updateMultiSelectList(state, action) {
    const { field, value } = action

    if (!state.get(field)) {
        return state.set(field, new List([value]))
    }

    return state.update(field, list => {
        if (list.includes(value)) {
            return list.filter(item => item !== value)
        }
        return [...list, value]
    })
}