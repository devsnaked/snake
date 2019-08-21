import StringField from './String'
import SelectField from './Select'

const fieldTypes = {
    string: StringField,
    select: SelectField
}

function types(){
    return Object.keys(fieldTypes)
}


export {
    fieldTypes,
    types
};