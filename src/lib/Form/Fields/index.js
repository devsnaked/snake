/**
* @ignore
*/

import StringField from './String/String'
import SelectField from './Select/Select'
import SwitchField from './Switch/Switch'
import FileInput from './File/File'
import RadioListField from './Radio/Radio'
import DatePicker from './DatePicker/DatePicker'
import NumberField from './Number/Number'
import MultiSelect from './MultiSelect/MultiSelect'
import CheckboxList from './Checkbox/Checkbox'
import SliderField from './Slider/Slider'

const fieldTypes = {
    string: StringField,
    select: SelectField,
    switch: SwitchField,
    file: FileInput,
    radio: RadioListField,
    date: DatePicker,
    number: NumberField,
    multiSelect: MultiSelect,
    checkbox: CheckboxList,
    slider: SliderField
}

function types(){
    return Object.keys(fieldTypes)
}


export {
    fieldTypes,
    types
};