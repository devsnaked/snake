import React from 'react'
import { FormGroup, FileInput } from "@blueprintjs/core"
import { useSelector, useDispatch } from 'react-redux'
import { debounce } from 'debounce'

export default function FileInputField(props) {

  const { label, name, helper, info, buttonText, multiple } = props;
  const value = useSelector(state => state.form.get(name))
  const errorMessage = useSelector(state => state.validator.get(name))
  const dispatch = useDispatch()
  const id = `string-field-${name}`
  let { placeholder } = props;

  const handleChange = debounce((value) => handleChangeInputFile(name, value.files, dispatch), 300)
  const intent = (errorMessage ? 'danger' : 'none')

  if (value && value.length > 0) {
    placeholder = getText(value);
  }

  return (
    <FormGroup
      intent={intent}
      helperText={errorMessage ? errorMessage : helper}
      label={label}
      labelFor={id}
      labelInfo={info}>
      <FileInput
        id={id}
        text={placeholder}
        hasSelection={value}
        buttonText={buttonText}
        inputProps={{ multiple }}
        intent={intent}
        onChange={event => handleChange(event.target)}
      />
    </FormGroup>
  )
}


function handleChangeInputFile(field, value, dispatch) {
  if(value.length === 0) value = null;

  dispatch({ type: 'UPDATE_FIELD', field, value })
}

function getText(fileList) {
  return Array.from(fileList).map(file => file.name).join(',')
}