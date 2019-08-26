import React from 'react'
import { required, dynamic } from '../Form/Utils/Validators'
import { Tag } from '@blueprintjs/core';

export default {
    rows: 7,
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
                dynamic('Você precisa valir essa rn', (_, state) => {
                    return (state.get('name').length >= 5)
                })
            ]
        },
        hero: {
            row: 2,
            label: 'Selecione o seu hero...',
            type: 'select',
            placeholder: 'Random hero',
            helper: 'Helper text with details...',
            info: '(required)',
            data: {
                url: "https://api.opendota.com/api/heroes",
                text: hero => {
                    const intents = { agi: 'success', str: 'danger', int: 'primary' }
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ marginRight: '16px' }}>
                                {hero.localized_name}
                            </div>
                            <Tag minimal intent={intents[hero.primary_attr]}>{hero.primary_attr}</Tag>
                        </div>
                    )
                },
                id: hero => hero.id,
                filterBy: ['localized_name', 'primary_attr'],
                middleware: data => {
                    return data.filter(hero => {
                        return hero.roles.includes('Jungler')
                    }).sort((a, b) => a.primary_attr.localeCompare(b.primary_attr))
                }
            },
            validators: [
                required('Selecione um hero...')
            ]
        },
        github: {
            row: 3,
            label: 'Digite o seu github',
            type: 'string',
            placeholder: 'Escreva o seu github...',
            info: '(required)',
            validators: [
                required('Informe o seu github...')
            ]
        },
        active: {
            row: 4,
            label: 'Você joga frequentenemente ?',
            type: 'switch',
            helper: 'Se sim... você irá concorrer a uma skin hara.',
        },
        picture: {
            row: 5,
            label: 'Selecione uma foto sua.',
            type: 'file',
            placeholder: 'Selecione uma imagem',
            buttonText: 'Navegador',
            helper: 'Essa foto será usada como foto do seu perfil',
            multiple: true,
            validators: [
                required('Selecione uma imagem.')
            ]
        },
        preference: {
            row: 6,
            label: 'Minha preferência como desenvolvedor é ?',
            type: 'radio',
            placeholder: 'Escreva o seu github...',
            info: '(required)',
            helper: 'Isso será usado para recomendar conteúdo para você!',
            options: [
                { label: 'Front-end', value: 'front' },
                { label: 'Back-end', value: 'back' },
                { label: 'Full-stack', value: 'full' }
            ],
            validators: [
                required('Informe sua preferência como desenvolvedor...')
            ]
        },
        date: {
            row: 7,
            label: 'Você joga frequentenemente ?',
            type: 'date',
            helper: 'Se sim... você irá concorrer a uma skin hara.',
            placeholder: '09/04/1998',
            min: new Date('2019-06-11T03:00:00.000Z'),
            max: new Date()
        },
        age: {
            row: 7,
            label: 'Qual a sua idade ?',
            type: 'number',
            helper: 'Valor mínimo 18, Valor máximo 60...',
            placeholder: 'Example: 15',
            min: 18,
            max: 60,
            validators: [
                required('Informe a sua idade.')
            ]
        }
    },
    onSubmit: (form) => {
        console.table(form)
    },
    set: (dispatch) => {
        dispatch({
            name: 'Maximilly',
            lastname: 'Moreira',
            hero: 53,
            github: 'devsnaked',
            active: true,
            age: 19
        })
    }
}