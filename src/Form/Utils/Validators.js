import { types } from './../Fields'

function checkFieldsType(schema) {
    const { fields } = schema;
    const snakeTypes = types();

    for (const field of Object.values(fields)) {
        if (!snakeTypes.includes(field.type)) {
            throw new Error(`Invalid type at the field ${JSON.stringify(field)}`);
        }
    }

    return true;
}

function checkFieldsRow(schema) {
    const { fields, rows } = schema;

    for (const field of Object.values(fields)) {
        if (field.row > rows) {
            throw new Error(`Invalid row at the field ${JSON.stringify(field)}`);
        }
    }

    return true;
}

function required(message) {
    return {
        message,
        run: (value) => !!value
    }
}

function dynamic(message, callback){
    return {
        message,
        run: (value, store) => callback(value, store)
    }
}


function schemaValidator(schema) {
    return [
        checkFieldsType,
        checkFieldsRow
    ].every(validator => validator(schema))
}

export {
    schemaValidator,
    checkFieldsType,
    checkFieldsRow,
    required,
    dynamic
}