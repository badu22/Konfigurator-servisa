

export async function getManufacturers() {
	const response = await fetch(`${process.env.API_URL}/api/manufacturers`, {
		headers: {
			'x-authentication-token': process.env.API_AUTH
		}
	});
	const posts = await response.json();
	// console.log(posts);
	return posts;
}

export async function getServices() {
	const response = await fetch(`${process.env.API_URL}/api/services`, {
		headers: {
			'x-authentication-token': process.env.API_AUTH
		}
	});
	const posts = await response.json();
	// console.log(posts);
	return posts;
}

