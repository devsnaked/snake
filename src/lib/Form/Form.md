```jsx
    const schema = {
        fields: {
            name: {
                row: 1,
                type: 'string',
                placeholder: 'Nome',
                label: 'Name',
                info: '(required)'
            },
            othername: {
                row: 1,
                type: 'string',
                placeholder: 'Sobrenome',
                label: 'Sobrenome',
                info: '(required)'
            }
        },
        onSubmit: () => {}
    }
    return <SForm schema={schema} />
```