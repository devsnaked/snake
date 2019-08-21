import React, { useState, useEffect } from 'react';
import { FormGroup, Button, MenuItem } from '@blueprintjs/core'
import { Select } from "@blueprintjs/select";
import { useSelector, useDispatch } from 'react-redux'

export default function SelectField(props) {
    const { label, name, helper, info, data, placeholder } = props;
    const { url, filterBy, text, id, middleware } = data;
    const [items, setItems] = useState(data.items || []);
    const elementId = `select-field-${name}`
    const dispatch = useDispatch()

    const value = useSelector(state => {
        return items.find(item => id(item) === state.form.get(name))
    })

    useEffect(() => {
        if (url) {
            requestData(url)
                .then(response => middleware(response))
                .then(response => {
                    setItems(response)
                })
        }
    }, [data.url])

    function handleChangeSelect(item, name) {
        dispatch({ type: 'UPDATE_FIELD', field: name, value: id(item) })
    }

    return (
        <FormGroup
            helperText={helper}
            label={label}
            labelFor={elementId}
            labelInfo={info}>
            <Select
                items={items}
                itemRenderer={(item) => {
                    return <MenuItem
                        key={id(item)}
                        text={text(item)}
                        onClick={() => handleChangeSelect(item, name)} />
                }}
                itemPredicate={(value, item) => filterItems(value, item, filterBy)}>
                <Button
                    text={value ? text(value) : placeholder}
                    rightIcon="double-caret-vertical" />
            </Select>
        </FormGroup>
    )
}

function filterItems(value, item, filterBy) {
    return filterBy.some(key => item[key].toLowerCase().includes(value.toLowerCase()))
}

function requestData(url) {
    return fetch(url).then(res => res.json())
}
