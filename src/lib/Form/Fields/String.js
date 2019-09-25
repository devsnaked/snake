import React from 'react'
import { FormGroup, InputGroup } from "@blueprintjs/core"
import { useSelector, useDispatch } from 'react-redux'
import { debounce } from 'debounce'

/**  
 * String is a simple input text.
*/
export default function String(props) {

    const { label, name, placeholder, helper, info } = props;
    const value = useSelector(state => state.form.get(name))
    const errorMessage = useSelector(state => state.validator.get(name))
    const dispatch = useDispatch()
    const id = `string-field-${name}`

    const handleChange = debounce((value) => handleChangeInput(name, value, dispatch), 300)
    const intent = (errorMessage ? 'danger' : 'none')

    return (
        <FormGroup
            intent={intent}
            helperText={errorMessage ? errorMessage : helper}
            label={label}
            labelFor={id}
            labelInfo={info}>
            <InputGroup
                id={id}
                placeholder={placeholder}
                defaultValue={value}
                intent={intent}
                onChange={event => handleChange(event.currentTarget.value)}
            />
        </FormGroup>
    )
}


function handleChangeInput(field, value, dispatch) {
    dispatch({ type: 'UPDATE_FIELD', field, value })
}