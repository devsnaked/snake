import StringField from './String'
import SelectField from './Select'
import SwitchField from './Switch'


const fieldTypes = {
    string: StringField,
    select: SelectField,
    switch: SwitchField
}

function types(){
    return Object.keys(fieldTypes)
}


export {
    fieldTypes,
    types
};