
async function authenticateUser() {
    const loginId = document.getElementById("login_id").value;
    const password = document.getElementById("password").value;

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp';

    const response = await fetch(proxyUrl + targetUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "login_id": loginId,
            "password": password
        }),
        mode: 'cors', 
    });

    if (response.status === 200) {
        const data = await response.json();
        const accessToken = data.access_token; 
    //    console.log(accessToken);
        document.getElementById("tokenMessage").textContent = `<h1>${accessToken}</h1>`;

        localStorage.setItem('bearerToken', accessToken);
        window.location.href = 'customerList.html';
    } else {
        document.getElementById("tokenMessage").style.display = 'block';
        document.getElementById("tokenMessage").textContent = 'Authentication failed. Check your credentials.';
    }
}


