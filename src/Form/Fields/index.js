import StringField from './String'
import SelectField from './Select'
import SwitchField from './Switch'
import FileInput from './FileInput'
import RadioListField from './RadioList'
import DatePicker from './DatePicker'
import NumberField from './Number'
import MultiSelect from './MultiSelect'

const fieldTypes = {
    string: StringField,
    select: SelectField,
    switch: SwitchField,
    file: FileInput,
    radio: RadioListField,
    date: DatePicker,
    number: NumberField,
    multiSelect: MultiSelect
}

function types(){
    return Object.keys(fieldTypes)
}


export {
    fieldTypes,
    types
};