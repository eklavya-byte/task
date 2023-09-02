async function createCustomer() {
    const token = localStorage.getItem('bearerToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const street = document.getElementById("street").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create';

    const response = await fetch(proxyUrl+targetUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "first_name": firstName,
            "last_name": lastName,
            "street": street,
            "address": address,
            "city": city,
            "state": state,
            "email": email,
            "phone": phone
        })
    });

    if (response.status === 201) {
        alert('Customer created successfully.');
       
        // Redirect to Customer List 
        window.location.href = 'customerList.html';
    } else {
        alert('First Name or Last Name is missing');
    }
}

function logout() {
    localStorage.removeItem('bearerToken');
    window.location.href = 'index.html';
}