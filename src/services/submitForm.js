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
    console.log('xxxxxxxxxxxx', data);
    

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
        console.log('res', response);
        const status = response.status;
        const resData = await response.json();
        console.log('res status', status);
        console.log('res json', resData);

        return status;

    } catch (error) {
        // Handle error if necessary
        console.error(error)
    }
}

export async function validateCupon(cupon) {
    try {
        console.log(cupon);
        const response = await fetch(`${process.env.API_URL}/api/validate-promo-code/${cupon}`, {
            method: 'POST',
            headers: {
                'x-authentication-token': process.env.API_AUTH
            }
        });
        console.log(response.status); // 404  | 200
        let cuponAnswer = await response.json();
        cuponAnswer.status = response.status;
        console.log(cuponAnswer);
        // console.log(posts);
        return cuponAnswer;
        // const formData = new FormData(event.target)
        // console.log(formData);
        // const response = await fetch('/api/submit', {
        // 	method: 'POST',
        // 	body: formData,
        // })
    
        // Handle response if necessary
        // const data = await response.json()
        // ...

    } catch (error) {
        // Handle error if necessary
        console.error(error)
    } finally {
        // setIsLoading(false) // Set loading to false when the request completes
    }
}