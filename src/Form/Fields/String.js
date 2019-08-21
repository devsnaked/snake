import React, { useState, useEffect } from 'react'
import { FormGroup, InputGroup } from "@blueprintjs/core"
import { useSelector, useDispatch } from 'react-redux'
import { debounce } from 'debounce'

export default function StringField(props) {

    const { label, name, placeholder, helper, info } = props;
    const value = useSelector(state => state.form.get(name))
    const errorMessage = useSelector(state => state.validator.get(name))
    const dispatch = useDispatch()
    const id = `string-field-${name}`

    const handleChange = debounce((value) => handleChangeInput(name, value, dispatch), 300)


    return (
        <FormGroup
            intent={errorMessage ? 'danger' : 'none'}
            helperText={errorMessage ? errorMessage : helper}
            label={label}
            labelFor={id}
            labelInfo={info}>
            <InputGroup
                id={id}
                placeholder={placeholder}
                defaultValue={value}
                intent={errorMessage ? 'danger' : 'none'}
                onChange={event => handleChange(event.currentTarget.value)}
            />
        </FormGroup>
    )
}


function handleChangeInput(field, value, dispatch) {
    dispatch({ type: 'UPDATE_FIELD', field, value })
}