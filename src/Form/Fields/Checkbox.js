import React from 'react'
import { FormGroup, Checkbox, Classes } from "@blueprintjs/core"
import { useSelector, useDispatch } from 'react-redux'

export default function CheckboxList(props) {

  const { label, name, options = [], helper, info } = props;
  const values = useSelector(state => state.form.get(name) || [])
  const errorMessage = useSelector(state => state.validator.get(name))
  const dispatch = useDispatch()

  const handleChange = (value) => handleCheckbox(name, value, dispatch)
  const intent = (errorMessage ? 'danger' : 'none')


  function renderCheckboxList(options) {
    return options.map((opt, index) => {
      const label = typeof opt.label === 'function' ? opt.label() : opt.label;

      return (
        <Checkbox
          label={label}
          value={opt.value}
          key={index}
          checked={
            values.includes(opt.value)
          }
          onChange={
            () => handleChange(opt.value)
          } />
      );
    })
  }


  return (
    <FormGroup
      intent={intent}
      helperText={errorMessage ? errorMessage : helper}
      label={label}
      labelInfo={info}>
      {renderCheckboxList(options)}
    </FormGroup>
  )
}


function handleCheckbox(field, value, dispatch) {
  dispatch({ type: 'UPDATE_FIELD_LIST_VALUE', field, value })
}
