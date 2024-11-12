'use client'
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import {
    name_validation,
    email_validation,
    phone_validation,
    radioValidation,
    message_validation
} from '@/utils/inputValidations';
import { makeServiceId } from '@/utils'
import { validateCupon, submitForm } from '@/services/submitForm';
import Input from "@/app/_components/input";



export default function Form(props) {

    // mani data object
    const [mainData, setMainData] = useState({});

    // calculate price
    const [total, setTotal] = useState(0);

    function totalCalc(service) {
        const priceValue = parseInt(service, 10);
        const newTotal = total + priceValue;
        setTotal(newTotal);
    }

    const [preview, setPreview] = useState(false);
    const [cupon, setCupon] = useState(false);
    const [validCupon, setValidCupon] = useState({});
    const [serviceIds, setServiceIds] = useState([]);
    const [serviceSelection, setServiceSelection] = useState(true);
    const router = useRouter();
    

    function toggleCupon() {
        setCupon(!cupon);
    }

    function removeCupon() {
        setCupon(false);
        if (validCupon.status === 200) setTotal(total + validCupon.discountPercentage);
        setValidCupon({});
    }

    const handleCupon = useCallback(async (cuponValue) => {
        const cuponObj = await validateCupon(cuponValue);
        setValidCupon(cuponObj);
        if (cuponObj && cuponObj.message !== 'Promotional code invalid') {
            const newTotal = total - cuponObj?.discountPercentage;
            setTotal(newTotal);
        }
    }, [total])

    function prepareServiceIds(data) {
        const allServices = props.data.allServices;
        const selectedServices = [];
        allServices.forEach(service => {
            Object.entries(data).forEach(([key, value]) => {
                if (key.replaceAll('-', ' ') === service.name.toLowerCase() && value) {
                    selectedServices.push(service.id);
                }
            });
        });

        return selectedServices;
    }

    // form methods
    const methods = useForm();
    const onSubmit = methods.handleSubmit(data => {
        const selectedServices = prepareServiceIds(data);
        if (!preview) {
            setMainData(data);
            setServiceIds(selectedServices);
            setPreview(true);
            setServiceSelection(true);
        } else {
            if (selectedServices?.length !== 0) {
                submitFormCall();
            } else {
                setServiceSelection(false);
            }
        }
    })

    const submitFormCall = useCallback(async () => {
        const formatData = {
            manufacturerId: mainData.manufacturer,
            serviceIds: serviceIds,
            fullName: mainData.name,
            email: mainData.email,
            phoneNumber: mainData.phone.toString(),
            note: mainData.message
        };
        if (validCupon) formatData.promoCode = mainData.cupon;
        const submitedFormRes = await submitForm(formatData);
        if (submitedFormRes === 201) {
            router.push('zahtjev-poslan');
        }
    }, [mainData, serviceIds, router])

    const checkboxChange = domObj => {
        const checkboxObj = {
            selected: domObj.target.checked,
            name: domObj.target.name,
            value: domObj.target.value
        }
        const itemPrice = checkboxObj.selected ? checkboxObj.value : -checkboxObj.value;
        totalCalc(itemPrice);
    }

    function checkboxValidation(service) {
        return {
            name: makeServiceId(service.name),
            label: `${service.name} (${service.price}€)`,
            type: 'checkbox',
            id: service.id,
            value: service.price,
            className: 'flex-row gap-2',
            classNameLabel: 'flex order-2 cursor-pointer',
            checkboxChange: checkboxChange,
        }
    }

    const cupon_validation = {
        name: 'cupon',
        type: 'text',
        id: 'cupon',
        checkCupon: handleCupon
    }

    function goBack() {
        setPreview(false);
    }


    return (
        <div className='container max-w-[600px] pt-[72px] mx-auto font-[family-name:var(--font-satoshi)]'>
            <FormProvider {...methods}>
                <form
                    onSubmit={e => e.preventDefault()}
                    noValidate
                    autoComplete="off"
                    className="container"
                >
                    <div>
                        <h2 className='text-[32px] font-bold py-4'>Konfigurator servisa</h2>
                    </div>

                    {!preview && (
                        <div>
                            <h3 className='text-[18px] font-medium text-blue-800 py-2'>Odaberite proizvođaća svog vozila</h3>
                            <div className='columns-3 pb-4'>
                                {props.data.allManufacturers.map(manufacturer => (
                                    <div key={manufacturer.id} className='pb-1'>
                                        <Input {...radioValidation(manufacturer.name)} />
                                    </div>
                                ))}
                            </div>
                            
                            <h3 className='text-[18px] font-medium text-blue-800 py-2'>Odaberite jedni ili više usluga koje trebate</h3>
                            <div className='columns-2 pb-4 relative'>
                                {props.data.allServices.map(service => (
                                    <div key={service.id} className='pb-1'>
                                        <Input {...checkboxValidation(service)} />
                                    </div>
                                ))}
                            </div>
                            
                            <div className='flex justify-between px-4 py-2 bg-gray-50 rounded mb-2'>
                                <div>
                                    <p>ukupno: <strong>{total},00 &euro;</strong></p>
                                </div>
                                <div>
                                    {!cupon ? (
                                        <p className='text-blue-600' onClick={() => toggleCupon(!cupon)}>Imam kupon</p>
                                    ) : (
                                        <div>
                                            <Input {...cupon_validation} />
                                            {validCupon?.status === 200 && ( 
                                                <div className='rounded-full bg-white border border-gray-200 px-2 my-2 inline-block'>{validCupon.code} <span className='cursor-pointer' onClick={() => removeCupon()}>✕</span></div>
                                            )}
                                            {validCupon?.status === 404 && ( 
                                                <div className='rounded-full bg-white border border-gray-200 px-2 my-2 inline-block'>Kupon nije validan <span className='cursor-pointer' onClick={() => removeCupon()}>✕</span></div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                                
                            <h3 className='text-[18px] font-medium text-blue-800 py-2'>Vaši podaci</h3>
                            <div className='pb-4'>
                                <Input {...name_validation} />
                            </div>
                            <div className='pb-4'>
                                <Input {...phone_validation} />
                            </div>
                            <div className='pb-4'>
                                <Input {...email_validation} />
                            </div>
                            <div className='pb-4'>
                                <Input {...message_validation} />
                            </div>
                        </div>
                    )}
                    {preview && (
                        <div>
                            <h3 className='text-[18px] font-medium pb-2'>Pregled i potvrda vašeg odabira</h3>
                                                        
                            <p className='pt-2 pb-4'>Molimo vas da još jednom pregledate i potvrdite podatke. Ukoliko želite promijeniti neki od podataka, vratite se na prethodni korak. Kada ste provjerili ispravnost svojih podataka, za slanje upita na servis pritisnite gumb “Pošalji”.</p>

                            <div className='p-5 bg-gray-100 rounded mb-2'>
                                <div className='pb-2'>
                                    <p className='text-[18px] font-medium text-blue-800'>Model vozila:</p>
                                    <p>{mainData.manufacturer}</p>
                                </div>
                                
                                <div className='pb-2'>
                                    <p className='text-[18px] font-medium text-blue-800'>Odabrane usluge:</p>
                                    {props.data.allServices.map(service => {
                                        const serviceName = makeServiceId(service.name);
                                        if (mainData[serviceName]) {
                                            return (
                                                <dl key={service.id} className='flex content-between border-b border-gray-300 py-1'>
                                                    <dt className='grow-0 shrink-0 basis-80'>{service.name}:</dt>
                                                        <dd className='grow-1 w-full text-right'>{mainData[serviceName]},00 &euro;</dd>
                                                </dl> 
                                            )}
                                        }
                                    )}
                                    {validCupon.discountPercentage && (
                                        <dl className='flex justify-end py-1'>
                                            <dt className=''>Popust:</dt>
                                                <dd className='grow-0 shrink-0 basis-24 text-right'>-{validCupon.discountPercentage},00 &euro;</dd>
                                        </dl>
                                    )}
                                    <dl className='flex justify-end'>
                                        <dt className=''>Total:</dt>
                                            <dd className='grow-0 shrink-0 basis-24 text-right'>{total} </dd>
                                    </dl>
                                </div>
                                
                                <div>
                                    <p className='text-[18px] font-medium text-blue-800'>Kontakt podaci:</p>
                                    <dl className='flex'>
                                        <dt className='grow-0 shrink-0 basis-32'>Ime i prezime:</dt>
                                            <dd>{mainData.name}</dd>
                                    </dl> 
                                    <dl className='flex'>
                                        <dt className='grow-0 shrink-0 basis-32'>Broj telefona:</dt>
                                            <dd>{mainData.phone}</dd>
                                    </dl> 
                                    <dl className='flex'>
                                        <dt className='grow-0 shrink-0 basis-32'>Email adresa:</dt>
                                            <dd>{mainData.email}</dd>
                                    </dl> 
                                    {mainData.message && (
                                        <dl className='flex'>
                                            <dt className='grow-0 shrink-0 basis-32'>Napomena:</dt>
                                                <dd>{mainData.message}</dd>
                                        </dl>                
                                    )}
                                </div>
                                {!serviceSelection && (
                                    <div className="mt-5 px-2 text-red-500 bg-red-100 rounded-md">
                                        Niste odabrali uslugu
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className='flex'>
                        {preview && (
                            <button
                                onClick={goBack}
                                className="mr-2 bg-transparent hover:bg-blue-500 text-blue-800 hover:text-white py-2 px-4 border border-blue-800 hover:border-transparent rounded"
                            >
                                Natrag
                            </button>
                        )}
                        <button
                            onClick={onSubmit}
                            className="p-2 rounded-md bg-blue-800 text-white items-center gap-1 hover:bg-blue-600 grow text-center rounded"
                        >
                            {preview ? 'Pošalji' : 'Dalje'}
                        </button>
                    </div>
                    {/* {isInvalid && (
                            <div className="absolute right-[0px] top-[-2px] px-2 text-red-500 bg-red-100 rounded-md">
                                {inputErrors.error.message}
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={() => {
                                setError("name", { type: "focus" }, { shouldFocus: true })
                            }}
                        >kdkdkdk</button> */}
                </form>
            </FormProvider>
        </div>
    );
}
