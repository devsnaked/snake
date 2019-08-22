import React from 'react'
import { required } from '../Form/Utils/Validators'
import { Tag } from '@blueprintjs/core';

export default {
    rows: 5,
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
            helper: 'Essa foto será usada como foto do seu perfil'
        }
    },
    onSubmit: (form) => {
        console.log(form)
    }
}