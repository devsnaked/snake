import React from 'react'
import { FormGroup, RadioGroup, Radio } from "@blueprintjs/core"
import { useSelector, useDispatch } from 'react-redux'

export default function RadioField(props) {

  const { label, name, options, helper, info } = props;
  const value = useSelector(state => state.form.get(name))
  const errorMessage = useSelector(state => state.validator.get(name))
  const dispatch = useDispatch()

  const handleChange = (value) => handleChangeRadioGroup(name, value, dispatch)
  const intent = (errorMessage ? 'danger' : 'none')

  return (
    <FormGroup
      intent={intent}
      helperText={errorMessage ? errorMessage : helper}
      label={label}
      labelInfo={info}>
      <RadioGroup
        onChange={event => handleChange(event.currentTarget.value)}
        selectedValue={value}>
        {renderRadioList(options)}
      </RadioGroup>
    </FormGroup>
  )
}


function handleChangeRadioGroup(field, value, dispatch) {
  dispatch({ type: 'UPDATE_FIELD', field, value })
}

function renderRadioList(options) {
  return options.map((opt, index) => {
    const label = typeof opt.label === 'function' ? opt.label() : opt.label;

    return (<Radio label={label} value={opt.value} key={index} />);
  })
}