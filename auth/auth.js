const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


    // Form validation
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            // Basic validation
            if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                return;
            }

            if (password.length < 6) {
                showError('password', 'Password must be at least 6 characters');
                return;
            }

            let user = {email: email, password: password};
            user = JSON.stringify(user);

            $.ajax({
                url: 'http://localhost:8082/cms/api/v1/auth/signin',
                type: 'POST',
                data: user,
                headers: { "Content-Type": "application/json" },
                success: (response) => {
                    document.cookie = "token=" + response.token;
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('user', email);
                    window.location.href = 'home/home.html';
                },
                error: (xhr, status, error) => {
                    console.log(xhr.responseText);
                }
            });
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const role = document.getElementById('role').value;

            // Basic validation
            if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                return;
            }

            if (password.length < 6) {
                showError('password', 'Password must be at least 6 characters');
                return;
            }

            if (password !== confirmPassword) {
                showError('confirmPassword', 'Passwords do not match');
                return;
            }

            if (role === '') {
                showError('role', 'Please select a role');
                return;
            }

            let user = {email: email, password: password, role: role};
            user = JSON.stringify(user);

            $.ajax({
                url: 'http://localhost:5050/greenshow/api/v1/user',
                type: 'POST',
                data: user,
                headers: { "Content-Type": "application/json" },
                success: (response) => {
                    // document.cookie = "token=" + response.token;
                    // localStorage.setItem('token', response.token);
                    localStorage.setItem('user', email);
                    window.location.href = '../index.html';
                },
                error: (xhr, status, error) => {
                    console.log(xhr.responseText);
                }
            });

        });
    }


    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }