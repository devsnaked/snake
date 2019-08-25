import React from 'react'
import { FormGroup } from "@blueprintjs/core"
import { useSelector, useDispatch } from 'react-redux'
import { DateInput } from '@blueprintjs/datetime'
export default function DateInputField(props) {

    const { label, name, placeholder, helper, info, locale, timer } = props;
    const value = useSelector(state => state.form.get(name))
    const errorMessage = useSelector(state => state.validator.get(name))
    const dispatch = useDispatch()
    const id = `date-field-${name}`

    const handleChange = (value) => handleChangeDatePicker(name, value, dispatch)
    const intent = (errorMessage ? 'danger' : 'none')

    return (
        <FormGroup
            intent={intent}
            helperText={errorMessage ? errorMessage : helper}
            label={label}
            labelFor={id}
            labelInfo={info}>
            <DateInput
                placeholder={placeholder}
                onChange={handleChange}
                parseDate={str => new Date(str)}
                formatDate={date => displayDate(date, {timer, locale})}
                value={value}
                timePrecision={timer}
            />
        </FormGroup>
    )
}


function handleChangeDatePicker(field, value, dispatch) {
    dispatch({ type: 'UPDATE_FIELD', field, value: new Date(value) })
}

function displayDate(date, {timer, locale}){
    let dateString = date.toLocaleDateString(locale || 'pt-BR')
    if(timer){
        dateString += ` - ${date.toLocaleTimeString(locale || 'pt-BR', {hour: '2-digit', minute:'2-digit'})}`
    }
    return dateString;
}