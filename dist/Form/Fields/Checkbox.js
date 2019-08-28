import React from"react";import{FormGroup,Checkbox}from"@blueprintjs/core";import{useSelector,useDispatch}from"react-redux";export default function CheckboxList(a){var b=a.label,c=a.name,d=a.options,e=void 0===d?[]:d,f=a.helper,g=a.info,h=useSelector(function(a){return a.form.get(c)||[]}),i=useSelector(function(a){return a.validator.get(c)}),j=useDispatch(),k=function(a){return handleCheckbox(c,a,j)},l=i?"danger":"none";return React.createElement(FormGroup,{intent:l,helperText:i?i:f,label:b,labelInfo:g},function(a){return a.map(function(a,b){var c="function"==typeof a.label?a.label():a.label;return React.createElement(Checkbox,{label:c,value:a.value,key:b,checked:h.includes(a.value),onChange:function onChange(){return k(a.value)}})})}(e))}function handleCheckbox(a,b,c){c({type:"UPDATE_FIELD_LIST_VALUE",field:a,value:b})}