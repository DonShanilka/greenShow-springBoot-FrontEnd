const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Switch panels on button click
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Form elements for login
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.querySelector('#loginForm #email').value;
        const password = document.querySelector('#loginForm #password').value;

        const userData = { email, password };
        console.log(email," ", password)

        $.ajax({
            url: "http://localhost:5050/greenshow/api/v1/auth/signIn",
            type: "POST",
            data: JSON.stringify(userData),
            contentType: "application/json",
            success: (res) => {
                localStorage.setItem("jwtToken", res.token);
                alert("Login Successful");
                window.location.href = "../index.html";
            },
            error: (res) => {
                console.error(res);
                console.log(res.token);
            }
        });
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.querySelector('#signupForm #email').value;
        const password = document.querySelector('#signupForm #password').value;
        const confirmPassword = document.querySelector('#signupForm #confirmPassword').value;
        const role = document.getElementById('role').value;

        // Basic validation
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const user = JSON.stringify({ email, password, role });

        $.ajax({
            url: 'http://localhost:5050/greenshow/api/v1/auth',
            type: 'POST',
            data: user,
            contentType: "application/json",
            success: (response) => {
                alert("Account created successfully!");
                window.location.href = '../index.html';
            },
            error: (xhr) => {
                console.error(xhr);
                alert("Signup failed. Please try again.");
            }
        });
    });
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
