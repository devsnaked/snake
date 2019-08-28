import {
    checkFieldsType, 
    checkFieldsRow, 
    equalTo, 
    required
} from './Validators'

it('Invalid type at the schema', () => {
    expect(() => checkFieldsType({
        fields: {
            name: {
                row: 1,
                label: 'Nome',
                type: '',
                placeholder: 'Write your name...',
                helper: 'Helper text with details...'
            }
        },
    })).toThrow()
})

it('Valid type at the schema', () => {
    expect(checkFieldsType({
        fields: {
            name: {
                row: 1,
                label: 'Nome',
                type: 'string',
                placeholder: 'Write your name...',
                helper: 'Helper text with details...'
            }
        },
    })).toEqual(true)
})

it('Invalid row at the schema', () => {
    expect(() => checkFieldsRow({
        rows: 1,
        fields: {
            name: {
                row: 2
            }
        }
    })).toThrow()
})

it('Valid row at the schema', () => {
    expect(checkFieldsRow({
        rows: 2,
        fields: {
            name: {
                row: 2
            }
        }
    })).toEqual(true)
})

it('Validator function equalTo true', () => {
    const validator = equalTo('', true)
    expect(validator.run(true)).toEqual(true)
})

it('Validator function equalTo false', () => {
    const validator = equalTo('', false)
    expect(validator.run(true)).toEqual(false)
})

it('Validator function required when field don´t has value', () => {
    const validator = required('');
    expect(validator.run('')).toEqual(false);
})

it('Validator function required when field has value', () => {
    const validator = required('');
    expect(validator.run("Value")).toEqual(true);
})

it('Validator function required when field has value', () => {
    const validator = required('');
    expect(validator.run(0)).toEqual(true);
})

it('Validator function required when field has value', () => {
    const validator = required('');
    expect(validator.run(false)).toEqual(true);
})

