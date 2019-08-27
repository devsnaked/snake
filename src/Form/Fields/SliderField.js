import React, { useEffect } from 'react'
import { FormGroup, Slider } from "@blueprintjs/core"
import { useSelector, useDispatch } from 'react-redux'

export default function SliderField(props) {

    const { label, name, helper, info, min, max, vertical = false, labelRenderer } = props;
    const value = useSelector(state => state.form.get(name))
    const errorMessage = useSelector(state => state.validator.get(name))
    const dispatch = useDispatch()
    const id = `slider-field-${name}`

    const handleChange = (value) => handleChangeInput(name, value, dispatch)
    const intent = (errorMessage ? 'danger' : 'none')

    useEffect(() => {
        dispatch({ type: 'UPDATE_FIELD', field: name, value: min })
    }, [min, dispatch, name])

    return (
        <FormGroup
            intent={intent}
            helperText={errorMessage ? errorMessage : helper}
            label={label}
            labelFor={id}
            labelInfo={info}>
            <div style={{position: 'relative', width: '98%', margin: '0 1%'}}>
                <Slider
                    id={id}
                    value={value || min}
                    min={min}
                    max={max}
                    stepSize={1}
                    onChange={handleChange}
                    labelStepSize={10}
                    vertical={vertical}
                    labelRenderer={labelRenderer}
                />
            </div>
        </FormGroup>
    )
}


function handleChangeInput(field, value, dispatch) {
    dispatch({ type: 'UPDATE_FIELD', field, value })
}