import { required } from '../Form/Utils/Validators'


export default {
    rows: 3,
    fields: {
        name: {
            row: 1,
            label: 'Digite o seu nome',
            type: 'string',
            placeholder: 'Escreva o seu nome...',
            helper: 'Helper text with details...',
            info: '(required)',
            validators: [
                required('Preencha o nome corretamente')
            ]
        },
        lastname: {
            row: 2,
            label: 'Digite o seu sobrenome',
            type: 'string',
            placeholder: 'Escreva o seu sobrenome...',
            info: '(required)',
            validators: [
                required('Preencha o sobrenome corretamente')
            ]
        },
        username: {
            row: 2,
            label: 'Digite o seu nome de usuário',
            type: 'select',
            placeholder: 'Escreva o seu nome de usuário...',
            helper: 'Helper text with details...',
            info: '(required)',
        },
        github: {
            row: 3,
            label: 'Digite o seu github',
            type: 'string',
            placeholder: 'Escreva o seu github...',
            info: '(required)',
        },
    },
    onSubmit: (form) => {
        console.log(form)
    }
}