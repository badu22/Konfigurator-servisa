'use server'
 
const buildFormData = (data, parentKey) => {
    const formData = new FormData()
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
            buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
    } else {
        const value = data == null ? '' : data;
  
        formData.append(parentKey, value);
    }

    return formData;
};

export async function submitForm(data) {    

    try {
        // const formData = buildFormData(data)

        const jsonData = JSON.stringify(data);
        const response = await fetch(`${process.env.API_URL}/api/contact`, {
        	method: 'POST',
        	body: jsonData,
            headers: {
                'x-authentication-token': process.env.API_AUTH
            }
        })
        const status = response.status;
        const resData = await response.json();

        return status;

    } catch (error) {
        // Handle error if necessary
        console.error(error)
    }
}

export async function validateCupon(cupon) {
    try {
        const response = await fetch(`${process.env.API_URL}/api/validate-promo-code/${cupon}`, {
            method: 'POST',
            headers: {
                'x-authentication-token': process.env.API_AUTH
            }
        });

        let cuponAnswer = await response.json();
        cuponAnswer.status = response.status;
        
        return cuponAnswer;

    } catch (error) {
        // Handle error if necessary
        console.error(error)
    }
}