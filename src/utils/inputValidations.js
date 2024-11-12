export const name_validation = {
    name: 'name',
    label: 'Ime i prezime',
    type: 'text',
    id: 'name',
    placeholder: 'Unesite ime i prezime',
    className: 'flex-col',
    classNameLabel: 'px-4',
    validation: {
        required: {
            value: true,
            message: 'Obavezno',
        },
        maxLength: {
            value: 30,
            message: '30 characters max',
        },
    },
}

export const phone_validation = {
    name: 'phone',
    label: 'Broj telefona',
    type: 'number',
    id: 'phone',
    placeholder: 'Unesite broj telefona',
    className: 'flex-col',
    classNameLabel: 'px-4',
    validation: {
        required: {
            value: true,
            message: 'Obavezno',
        },
        valueAsNumber: true,
    },
}

export const email_validation = {
    name: 'email',
    label: 'Email adresa',
    type: 'email',
    id: 'email',
    placeholder: 'Unesite email adresu',
    className: 'flex-col',
    classNameLabel: 'px-4',
    validation: {
        required: {
            value: true,
            message: 'Obavezno',
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'not valid',
        },
    },
}

export const message_validation = {
    name: 'message',
    label: 'Napomena (opcionalno)',
    type: 'textarea',
    id: 'message',
    placeholder: 'Unesite napomenu',
    className: 'flex-col',
    classNameLabel: 'px-4',
}

export function radioValidation(name) {
    return {
        name: 'manufacturer',
        label: name,
        type: 'radio',
        id: name,
        value: name,
        className: 'flex-row gap-2',
        classNameLabel: 'flex order-2 cursor-pointer',
        validation: {
            required: {
                value: true,
                message: 'Obavezno',
            },   
        }
    }
}