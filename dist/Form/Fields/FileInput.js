import React from"react";import{FormGroup,FileInput}from"@blueprintjs/core";import{useSelector,useDispatch}from"react-redux";import{debounce}from"debounce";export default function FileInputField(a){var b=a.label,c=a.name,d=a.helper,e=a.info,f=a.buttonText,g={multiple:a.multiple},h=useSelector(function(a){return a.form.get(c)}),i=useSelector(function(a){return a.validator.get(c)}),j=useDispatch(),k="file-input-field-".concat(c),l=a.placeholder,m=debounce(function(a){return handleChangeInputFile(c,a.files,j)},300),n=i?"danger":"none";return h&&0<h.length&&(l=getText(h)),React.createElement(FormGroup,{intent:n,helperText:i?i:d,label:b,labelFor:k,labelInfo:e},React.createElement(FileInput,{id:k,text:l,hasSelection:h,buttonText:f,inputProps:g,intent:n,onChange:function onChange(a){return m(a.target)}}))}function handleChangeInputFile(a,b,c){0===b.length&&(b=null),c({type:"UPDATE_FIELD",field:a,value:b})}function getText(a){return Array.from(a).map(function(a){return a.name}).join(", ")}