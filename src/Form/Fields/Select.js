import React from 'react';
import { FormGroup, Button, MenuItem } from '@blueprintjs/core'
import { Select } from "@blueprintjs/select";
import { useSelector, useDispatch } from 'react-redux'

export default function SelectField(props) {
    const { label, name, helper, info } = props;
    const id = `select-field-${name}`
    const items = [{ label: "Maximilly Moreira Gonçalves", value: 1 }]
    const value = useSelector(state => {
        return items.find(item => item.value === state.form.get(name))
    })
    const dispatch = useDispatch()
    return (
        <FormGroup
            helperText={helper}
            label={label}
            labelFor={id}
            labelInfo={info}>
            <Select
                items={items}
                itemRenderer={(item) => {
                    return <MenuItem
                        key={item.label}
                        text={item.label}
                        onClick={() => handleChangeSelect(item, name, dispatch)} />
                }}
                itemPredicate={filterItems}>
                <Button text={value ? value.label : 'Selecione um item...'} rightIcon="double-caret-vertical" />
            </Select>
        </FormGroup>
    )
}

function filterItems(value, item) {
    return item.label.toLowerCase().includes(value.toLowerCase())
}

function handleChangeSelect(item, name, dispatch) {
    dispatch({ type: 'UPDATE_FIELD', field: name, value: item.value })
}