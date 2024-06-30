function loginUser() {
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const storedUser = localStorage.getItem(username);

    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === password) {
            alert('Login Successful!');
            window.location.href = 'home.html';
        } else {
            alert('Incorrect password!');
        }
    } else {
        alert('User not found!');
    }
}

function registerUser() {
    const newUsername = document.querySelector('input[name="newUsername"]').value;
    const newPassword = document.querySelector('input[name="newPassword"]').value;
    const fileUpload = document.getElementById('fileUpload').files[0];

    if (newUsername && newPassword && fileUpload) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const user = {
                username: newUsername,
                password: newPassword,
                avatar: event.target.result
            };
            localStorage.setItem(newUsername, JSON.stringify(user));
            alert('User registered successfully!');
        };
        reader.readAsDataURL(fileUpload);
    } else {
        alert('Please fill all the fields and upload an image.');
    }
}


function loginUser() {
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const storedUser = localStorage.getItem(username);

    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === password) {
            alert('Login Successful!');
            localStorage.setItem('currentUser', username);
            window.location.href = 'Home.html';
        } else {
            alert('Incorrect password!');
        }
    } else {
        alert('User not found!');
    }
}
