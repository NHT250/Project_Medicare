// Session Management
function setUserSession(userData) {
  localStorage.setItem("medicare_user", JSON.stringify(userData));
  localStorage.setItem("medicare_logged_in", "true");
}

function getUserSession() {
  const userData = localStorage.getItem("medicare_user");
  const isLoggedIn = localStorage.getItem("medicare_logged_in");
  return isLoggedIn === "true" ? JSON.parse(userData) : null;
}

function clearUserSession() {
  localStorage.removeItem("medicare_user");
  localStorage.removeItem("medicare_logged_in");
}

function isUserLoggedIn() {
  return localStorage.getItem("medicare_logged_in") === "true";
}

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", function () {
  if (isUserLoggedIn() && window.location.pathname.includes("index.html")) {
    // If user is already logged in and on login page, redirect to homepage
    window.location.href = "homepage.html";
  }
});

// Tab switching functionality
function switchTab(tabName) {
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (tabName === "login") {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
  } else {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  }
}

// Password visibility toggle
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const icon = input.nextElementSibling;

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

// Form validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function validatePhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

// Show error message
function showError(element, message) {
  // Remove existing error
  const existingError = element.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Add new error
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.style.color = "#ef4444";
  errorDiv.style.fontSize = "0.875rem";
  errorDiv.style.marginTop = "0.25rem";
  errorDiv.textContent = message;
  element.parentNode.appendChild(errorDiv);

  // Add error styling to input
  element.style.borderColor = "#ef4444";
}

// Clear error message
function clearError(element) {
  const existingError = element.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }
  element.style.borderColor = "#e5e7eb";
}

// Login form validation
function validateLoginForm(formData) {
  let isValid = true;

  // Validate email
  if (!formData.email || !validateEmail(formData.email)) {
    showError(
      document.getElementById("loginEmail"),
      "Please enter a valid email address"
    );
    isValid = false;
  } else {
    clearError(document.getElementById("loginEmail"));
  }

  // Validate password
  if (!formData.password || formData.password.length < 6) {
    showError(
      document.getElementById("loginPassword"),
      "Password must be at least 6 characters"
    );
    isValid = false;
  } else {
    clearError(document.getElementById("loginPassword"));
  }

  return isValid;
}

// Register form validation
function validateRegisterForm(formData) {
  let isValid = true;

  // Validate name
  if (!formData.name || formData.name.trim().length < 2) {
    showError(
      document.getElementById("registerName"),
      "Please enter your full name"
    );
    isValid = false;
  } else {
    clearError(document.getElementById("registerName"));
  }

  // Validate email
  if (!formData.email || !validateEmail(formData.email)) {
    showError(
      document.getElementById("registerEmail"),
      "Please enter a valid email address"
    );
    isValid = false;
  } else {
    clearError(document.getElementById("registerEmail"));
  }

  // Validate phone
  if (!formData.phone || !validatePhone(formData.phone)) {
    showError(
      document.getElementById("registerPhone"),
      "Please enter a valid phone number"
    );
    isValid = false;
  } else {
    clearError(document.getElementById("registerPhone"));
  }

  // Validate password
  if (!formData.password || !validatePassword(formData.password)) {
    showError(
      document.getElementById("registerPassword"),
      "Password must be at least 8 characters with uppercase, lowercase, and number"
    );
    isValid = false;
  } else {
    clearError(document.getElementById("registerPassword"));
  }

  // Validate confirm password
  if (
    !formData.confirmPassword ||
    formData.password !== formData.confirmPassword
  ) {
    showError(
      document.getElementById("confirmPassword"),
      "Passwords do not match"
    );
    isValid = false;
  } else {
    clearError(document.getElementById("confirmPassword"));
  }

  // Validate terms agreement
  if (!document.getElementById("agreeTerms").checked) {
    alert("Please agree to the Terms & Conditions");
    isValid = false;
  }

  return isValid;
}

// CAPTCHA validation
function validateCaptcha() {
  // Bỏ qua CAPTCHA khi chạy localhost (dev environment)
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    console.log("Bypassing CAPTCHA for localhost...");
    return true;
  }

  const captchaResponse = grecaptcha.getResponse();
  if (captchaResponse.length === 0) {
    alert("Please complete the CAPTCHA verification");
    return false;
  }
  return true;
}

// Form submission handlers
document.addEventListener("DOMContentLoaded", function () {
  // Login form submission
  document
    .getElementById("loginFormElement")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value,
      };

      // Validate form
      if (!validateLoginForm(formData)) {
        return;
      }

      // Validate CAPTCHA
      if (!validateCaptcha()) {
        return;
      }

      // Show loading state
      const submitBtn = this.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Logging in...";
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        // Save user session
        setUserSession({
          email: formData.email,
          loginTime: new Date().toISOString(),
        });

        alert("Login successful! Redirecting to homepage...");
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        grecaptcha.reset();

        // Redirect to homepage after successful login
        setTimeout(() => {
          window.location.href = "homepage.html";
        }, 1000);
      }, 2000);
    });

  // Register form submission
  document
    .getElementById("registerFormElement")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = {
        name: document.getElementById("registerName").value,
        email: document.getElementById("registerEmail").value,
        phone: document.getElementById("registerPhone").value,
        password: document.getElementById("registerPassword").value,
        confirmPassword: document.getElementById("confirmPassword").value,
      };

      // Validate form
      if (!validateRegisterForm(formData)) {
        return;
      }

      // Validate CAPTCHA
      if (!validateCaptcha()) {
        return;
      }

      // Show loading state
      const submitBtn = this.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Creating account...";
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert(
          "Registration successful! Please check your email for verification. Redirecting to homepage..."
        );
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        grecaptcha.reset();

        // Redirect to homepage after successful registration
        setTimeout(() => {
          window.location.href = "homepage.html";
        }, 1000);
      }, 2000);
    });

  // Real-time validation for register form
  const registerInputs = [
    "registerName",
    "registerEmail",
    "registerPhone",
    "registerPassword",
    "confirmPassword",
  ];

  registerInputs.forEach((inputId) => {
    const input = document.getElementById(inputId);
    input.addEventListener("blur", function () {
      const formData = {
        name: document.getElementById("registerName").value,
        email: document.getElementById("registerEmail").value,
        phone: document.getElementById("registerPhone").value,
        password: document.getElementById("registerPassword").value,
        confirmPassword: document.getElementById("confirmPassword").value,
      };

      // Validate specific field
      switch (inputId) {
        case "registerName":
          if (formData.name && formData.name.trim().length < 2) {
            showError(input, "Please enter your full name");
          } else {
            clearError(input);
          }
          break;
        case "registerEmail":
          if (formData.email && !validateEmail(formData.email)) {
            showError(input, "Please enter a valid email address");
          } else {
            clearError(input);
          }
          break;
        case "registerPhone":
          if (formData.phone && !validatePhone(formData.phone)) {
            showError(input, "Please enter a valid phone number");
          } else {
            clearError(input);
          }
          break;
        case "registerPassword":
          if (formData.password && !validatePassword(formData.password)) {
            showError(
              input,
              "Password must be at least 8 characters with uppercase, lowercase, and number"
            );
          } else {
            clearError(input);
          }
          break;
        case "confirmPassword":
          if (
            formData.confirmPassword &&
            formData.password !== formData.confirmPassword
          ) {
            showError(input, "Passwords do not match");
          } else {
            clearError(input);
          }
          break;
      }
    });
  });

  // Real-time validation for login form
  const loginInputs = ["loginEmail", "loginPassword"];

  loginInputs.forEach((inputId) => {
    const input = document.getElementById(inputId);
    input.addEventListener("blur", function () {
      const formData = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value,
      };

      // Validate specific field
      switch (inputId) {
        case "loginEmail":
          if (formData.email && !validateEmail(formData.email)) {
            showError(input, "Please enter a valid email address");
          } else {
            clearError(input);
          }
          break;
        case "loginPassword":
          if (formData.password && formData.password.length < 6) {
            showError(input, "Password must be at least 6 characters");
          } else {
            clearError(input);
          }
          break;
      }
    });
  });
});

// Add some interactive effects
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to form inputs
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentNode.style.transform = "scale(1.02)";
      this.parentNode.style.transition = "transform 0.2s ease";
    });

    input.addEventListener("blur", function () {
      this.parentNode.style.transform = "scale(1)";
    });
  });

  // Add click effect to buttons
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 100);
    });
  });
});
