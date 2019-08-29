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
        run: (value) => !(value === "" || value === null || value === undefined || value.length === 0)
    }
}

function dynamic(message, callback) {
    return {
        message,
        run: (value, store) => callback(value, store)
    }
}

function equalTo(message, value) {
    return {
        message,
        run: (fieldValue) => (value === fieldValue)
    }
}

function min(message, minValue) {
    return {
        message,
        run: (fieldValue) => (fieldValue >= minValue)
    }
}

function max(message, maxValue) {
    return {
        message,
        run: (fieldValue) => (fieldValue <= maxValue)
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
    dynamic,
    equalTo,
    max, 
    min
}