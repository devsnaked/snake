import { checkFieldsType, checkFieldsRow } from './Validators'

it('Invalid type at the schema', () => {
    expect(() => checkFieldsType({
        fields: {
            name: {
                row: 1,
                label: 'Nome',
                type: 'stringa',
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
