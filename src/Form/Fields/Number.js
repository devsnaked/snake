import React from 'react'
import { FormGroup, NumericInput } from "@blueprintjs/core"
import { useSelector, useDispatch } from 'react-redux'
import { debounce } from 'debounce'

export default function NumberField(props) {

    const { label, name, placeholder, helper, info, min, max } = props;
    const value = useSelector(state => state.form.get(name))
    const errorMessage = useSelector(state => state.validator.get(name))
    const dispatch = useDispatch()
    const id = `number-field-${name}`

    const handleChange = debounce((value) => handleChangeInput(name, value, dispatch, {min, max}), 300)
    const intent = (errorMessage ? 'danger' : 'none')

    return (
        <FormGroup
            intent={intent}
            helperText={errorMessage ? errorMessage : helper}
            label={label}
            labelFor={id}
            labelInfo={info}>
            <NumericInput
                id={id}
                placeholder={placeholder}
                defaultValue={value}
                intent={intent}
                min={min}
                value={value}
                max={max}
                onValueChange={number => handleChange(number)}
            />
        </FormGroup>
    )
}


function handleChangeInput(field, value, dispatch, {min, max}) {
    if(value < min) value = min;
    else if(value > max) value = max;
    
    dispatch({ type: 'UPDATE_FIELD', field, value })
}