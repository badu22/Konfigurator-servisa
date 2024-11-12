import cn from 'classnames'
import { findInputError, isFormInvalid } from '@/utils'
import { useFormContext  } from 'react-hook-form'
// import { AnimatePresence, motion } from 'framer-motion'
// import { MdError } from 'react-icons/md'

export default function Input({
        name,
        label,
        type,
        id,
        placeholder,
        validation,
        className,
        classNameLabel,
        value,
        checkboxChange,
        checkCupon
    }) {

    const {
        register,
        getValues,
        formState: { errors },
    } = useFormContext();

    const inputErrors = findInputError(errors, name);
    const isInvalid = isFormInvalid(inputErrors);
  
    const box_tailwind = 'p-2 rounded-md w-full border border-slate-300 placeholder:opacity-60'; // appearance-none 
    const input_tailwind = 'p-2 bg-gray-100 appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-800';
    const validate_cupon = 'px-3 ml-2 rounded-md bg-blue-800 text-white items-center gap-1 hover:bg-blue-600 grow text-center rounded';
  
    return (
        <div className={cn('flex w-full relative', className)}>
            {label && (
                <label htmlFor={id} className={cn(classNameLabel, isInvalid && 'text-red-500')}>
                    {label}
                </label>
            )}

            {(isInvalid && ['text', 'number', 'email'].indexOf(type) > -1) && (
                <div className="absolute right-[0px] top-[-2px] px-2 text-red-500 bg-red-100 rounded-md">
                    {inputErrors.error.message}
                </div>
            )}

            {id === 'cupon' && (
                <div className='flex'>
                    <input
                        id={id}
                        type={type}
                        className={cn(input_tailwind)}
                        placeholder={placeholder}
                        value={value}
                        {...register(name)}
                    />
                    <button className={cn(validate_cupon)} onClick={() => {checkCupon(getValues('cupon'))}}>&#10003;</button>
                </div>
            )}
             
            {(['text', 'number', 'email'].indexOf(type) > -1 && id !== 'cupon') && (
                <div className='flex w-full'>
                    <input
                        id={id}
                        type={type}
                        className={cn(input_tailwind)}
                        placeholder={placeholder}
                        value={value}
                        {...register(name, validation)}
                    />
                </div>                
            )}

            {type === 'checkbox' && (
                <div className='flex order-1 w-[16px]'>
                    <input
                        id={id}
                        type={type}
                        className={cn(box_tailwind)}
                        placeholder={placeholder}
                        value={value}
                        onClick={checkboxChange}
                        {...register(name, validation)}
                    />
                </div>
            )}

            {type === 'radio' && (
                <div className='flex order-1 w-[16px]'>
                    <input
                        id={id}
                        type={type}
                        className={cn(box_tailwind)}
                        placeholder={placeholder}
                        value={value}
                        {...register(name, validation)}
                    />
                </div>
            )}

            {type === 'textarea' && (
                <div className='flex w-full'>
                    <textarea
                        id={id}
                        type={type}
                        className={cn(input_tailwind, 'min-h-[10rem] max-h-[20rem] resize-y p-2')}
                        placeholder={placeholder}
                        {...register(name)}
                    ></textarea>
                </div>
            )}
        </div>
    )
}

// function InputError({ message }) {
//     return (
//         <div className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md">
//             {message}
//         </div>
//     )
// }


/*
// https://www.freecodecamp.org/news/how-to-validate-forms-in-react/
export const Input = ({
    prop1,
    prop2
})  => {
    function someFunc() {
    }

    return (
        <div>dom</div>
    )
}

*/