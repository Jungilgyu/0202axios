export async function fetchTitle() {
	const response = await fetch('./data.json');
	const resData = await response.json();

	if (!response.ok) {
		throw new Error('Failed to fetch places')
	}
	
	return resData;
}

export async function fetchUserTitle() {
	const response = await fetch('./user-title.json');
	const resData = await response.json();

	if (!response.ok) {
		throw new Error('Failed to fetch user places')
	}
	
	return resData.title;
}

export async function updateUserPlaces(title) {
	const response = await fetch('./user-title.json', {
		method: 'PUT',
		body: JSON.stringify({ title: title }),
		headers: {
			'Content-type': 'application/json'
		},
	});

	const resData = await response.json();

	if (!response.ok) {
		throw new Error('Failed to update user data.')
	}

	return resData.message;
}