

async function getCustomerList() {
    const token = localStorage.getItem('bearerToken');
    // console.log(token);
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    //cores was interfering so I use proxy url 
    const targetUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list';

    const response = await fetch(proxyUrl + targetUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 200) {
        const data = await response.json();
        const customerList = document.getElementById("customerList");
        customerList.innerHTML = '';

        data.forEach(user => {
            const row = customerList.insertRow();
            // row.insertCell().textContent=customer.uuid;
            row.id = `customerRow_${user.uuid}`;
            row.insertCell().textContent = user.first_name;
            row.insertCell().textContent = user.last_name;
            row.insertCell().textContent = user.street;
            row.insertCell().textContent = user.address;
            row.insertCell().textContent = user.city;
            row.insertCell().textContent = user.state;
            row.insertCell().textContent = user.email;
            row.insertCell().textContent = user.phone;


            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteCustomer(user.uuid);
            row.insertCell().appendChild(deleteButton);

        });
    } else {
        alert('Failed to fetch customer data. Please try again later.');
    }
}

async function deleteCustomer(id){

    const token = localStorage.getItem('bearerToken');
    // console.log(token);
    if (!token) {
        alert('something goes wrong ! ');
        setTimeout(2000);
        window.location.href = 'index.html';
        return; 
    }

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // const proxyUrl = 'http://localhost:3000/';

    const targetUrl = `https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${id}`;

    const response = await fetch(proxyUrl + targetUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if(response.status===200){
        alert("Successfully deleted");
    }else if(response.status===500){
        alert("Error Not deleted");
    }
    else{
        alert("UUID not found");
    }

    
    const customerRow = document.getElementById(`customerRow_${id}`);
    if (customerRow) {
        customerRow.remove();
    }
 
    console.log(response);
    
}

function addNewCustomer(){

    window.location.href = 'addNewCustomer.html';
}

function logout() {
    localStorage.removeItem('bearerToken');
    window.location.href = 'index.html';
}


window.onload = getCustomerList;
