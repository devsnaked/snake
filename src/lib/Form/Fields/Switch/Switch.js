import React from 'react';
import { FormGroup, Switch } from '@blueprintjs/core'
import { useSelector, useDispatch } from 'react-redux'

export default function SwitchField(props) {
  const { label, name, helper, info } = props;
  const errorMessage = useSelector(state => state.validator.get(name))
  const intent = (errorMessage ? 'danger' : 'none')
  const elementId = `switch-field-${name}`
  const value = useSelector(state => state.form.get(name))
  const dispatch = useDispatch()
  return (
    <FormGroup
      intent={intent}
      helperText={errorMessage ? errorMessage : helper}
      label={label}
      labelFor={elementId}
      labelInfo={info}>
      <Switch 
        id={elementId} 
        defaultChecked={value} 
        onChange={event => handleChangeSwitch(name, event.target.checked, dispatch)} 
      />
    </FormGroup>
  )

}


function handleChangeSwitch(field, value, dispatch) {
  dispatch({ type: 'UPDATE_FIELD', field, value })
}