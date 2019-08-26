import React, { useState, useEffect } from 'react';
import { FormGroup, Tag, MenuItem } from '@blueprintjs/core'
import { MultiSelect } from "@blueprintjs/select";
import { useSelector, useDispatch } from 'react-redux'
import { List } from 'immutable';

export default function SelectField(props) {
    const { label, name, helper, info, data, placeholder } = props;
    const { url, filterBy, text, id, middleware } = data;
    const [items, setItems] = useState(data.items || []);
    const [loading, setLoading] = useState(false)
    const elementId = `select-field-${name}`
    const dispatch = useDispatch()
    const errorMessage = useSelector(state => state.validator.get(name))
    const intent = (errorMessage ? 'danger' : 'none')

    const values = useSelector(state => {
        const value = state.form.get(name) || new List()
        return items.filter(item => value.includes(id(item)))
    })

    const stateValue = useSelector(state => state.form.get(name) || new List())

    useEffect(() => {
        if (url) {
            setLoading(true)
            requestData(url)
                .then(response => middleware(response))
                .then(response => {
                    setItems(response)
                    setLoading(false)
                })
        }
    }, [url, middleware])

    function handleChangeSelect(item) {
        dispatch({ type: 'UPDATE_FIELD_MULTI_SELECT', field: name, value: id(item) })
    }

    return (
        <FormGroup
            intent={intent}
            helperText={errorMessage ? errorMessage : helper}
            label={label}
            labelFor={elementId}
            labelInfo={info}>
            <MultiSelect
                loading={loading}
                id={elementId}
                items={items}
                placeholder={placeholder}
                fill
                selectedItems={values}
                itemRenderer={(item) => {
                    const isActive = stateValue.includes(id(item))
                    return <MenuItem
                        active={isActive}
                        icon={isActive && 'small-tick'}
                        key={id(item)}
                        text={text(item)}
                        onClick={() => handleChangeSelect(item)} />
                }}
                itemPredicate={(value, item) => filterItems(value, item, filterBy)}
                tagRenderer={item => text(item)}
                tagInputProps={{
                    tagProps: {
                        minimal: true,
                        onRemove: (_clickEvent, event) => {
                            handleChangeSelect(values[event['data-tag-index']])
                            _clickEvent.stopPropagation()
                        }
                    }
                }}>

            </MultiSelect>
        </FormGroup>
    )
}

function filterItems(value, item, filterBy) {
    return filterBy.some(key => item[key].toLowerCase().includes(value.toLowerCase()))
}

function requestData(url) {
    return fetch(url).then(res => res.json())
}
