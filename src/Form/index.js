import React, { useEffect } from 'react';
import { schemaValidator } from './Utils/Validators'
import { fieldTypes } from './Fields'
import { Button } from '@blueprintjs/core'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Map } from 'immutable'
import formReducer from './reducers/form'
import validatorReducer from './reducers/validator'
import 'normalize.css/normalize.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import './style.css'

const store = createStore(
    combineReducers({ form: formReducer, validator: validatorReducer }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


function Form(props) {
    const { schema } = props;
    const { onSubmit, set } = schema

    useEffect(() => {
        if(set) applyDispatchSchema(set)
        schemaValidator(schema)
    }, [schema, set]);

    const handleSubmit = event => {
        event.preventDefault()
        const state = store.getState().form
        if (applyValidators(schema, state, store.dispatch)) {
            onSubmit(state.toJS())
        } else {
            console.log('invalid')
        }
    }

    return (
        <Provider store={store}>
            <form onSubmit={handleSubmit}>
                <FormRows schema={schema} />
                <div className="flex-right">
                    <Button type="submit" intent="success" icon="floppy-disk">Submit</Button>
                </div>
            </form>
        </Provider>
    );
}

function FormRows(props) {
    const { schema } = props
    const { rows } = schema
    const fields = Object.entries(schema.fields)
    let rowsList = new Array(rows).fill([])

    for (let i = 0; i < fields.length; i++) {
        let [name, field] = fields[i]
        const SnakeFieldElement = fieldTypes[field.type]
        const index = (field.row - 1)
        rowsList[index] = [...rowsList[index], <SnakeFieldElement {...field} key={name} name={name} />]
    }

    return rowsList.map((elementList, index) => {
        return (
            <div className="row" key={index}>
                {elementList}
            </div>
        )
    })
}

function applyValidators(schema, state, dispatch) {
    const fields = Map(schema.fields)
    const mapErr = fields.reduce((errList, field, name) => {
        if (field.validators) {
            const failValidator = field.validators.find(validator => {
                return !validator.run(state.get(name), state)
            })
            if (failValidator) {
                return errList.set(name, failValidator.message)
            }
        }

        return errList;
    }, Map({}))

    dispatch({type: 'SET_ERR_MAP', map: mapErr})

    return (mapErr.size === 0)
}

function applyDispatchSchema(dispatchFromForm){
    dispatchFromForm((form) => {
        store.dispatch({type: 'SET_FORM_STATE', data: form})
    })
}



export default Form;