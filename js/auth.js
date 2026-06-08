function validateRequired(value) {
  return value.trim().length > 0;
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validatePassword(value) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/.test(value);
}

function getPasswordMessage() {
  return "La contrasena debe tener entre 8 y 20 caracteres, incluir mayuscula, minuscula, numero y un caracter especial (@, $, !, %, *, ?, &).";
}

function setFieldError(input, message) {
  const target = document.querySelector(`[data-error-for="${input.name}"]`);

  if (target) {
    target.textContent = message;
  }

  input.classList.toggle("is-invalid", Boolean(message));
}

function clearFormErrors(form) {
  form.querySelectorAll(".form-error").forEach((item) => {
    item.textContent = "";
  });
  form.querySelectorAll(".is-invalid").forEach((item) => item.classList.remove("is-invalid"));
}

function handleLogin(form) {
  const email = form.email.value.trim();
  const password = form.password.value;
  const users = getUsers();
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);

  if (!user) {
    setFieldError(form.password, "Correo o contrasena incorrectos.");
    return;
  }

  setSession({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    city: user.city
  });

  window.location.href = "../index.html";
}

function handleRegister(form) {
  const users = getUsers();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const city = form.city.value.trim();
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  if (users.some((item) => item.email.toLowerCase() === email.toLowerCase())) {
    setFieldError(form.email, "Ya existe una cuenta registrada con este correo.");
    return;
  }

  if (password !== confirmPassword) {
    setFieldError(form.confirmPassword, "Las contrasenas no coinciden.");
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    phone,
    city,
    password,
    role: "Cliente"
  };

  users.push(newUser);
  saveUsers(users);
  setSession({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    city: newUser.city,
    role: newUser.role
  });

  window.location.href = "../index.html";
}

function handleRecovery(form) {
  const email = form.email.value.trim();
  const notice = form.querySelector("[data-form-notice]");
  const user = getUsers().find((item) => item.email.toLowerCase() === email.toLowerCase());

  notice.textContent = user
    ? `Hemos simulado el envio de instrucciones a ${email}.`
    : "No encontramos una cuenta con ese correo.";
  notice.className = `notice mt-3 ${user ? "text-success" : "text-danger"}`;
}

function handleProfile(form) {
  const session = getSession();

  if (!session) {
    window.location.href = "login.html";
    return;
  }

  const users = getUsers();
  const userIndex = users.findIndex((item) => item.id === session.id);

  users[userIndex] = {
    ...users[userIndex],
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    city: form.city.value.trim()
  };

  saveUsers(users);
  setSession({
    ...session,
    name: users[userIndex].name,
    email: users[userIndex].email,
    phone: users[userIndex].phone,
    city: users[userIndex].city
  });

  const notice = form.querySelector("[data-form-notice]");
  notice.textContent = "Perfil actualizado correctamente.";
  notice.className = "notice mt-3 text-success";
}

function validateForm(form) {
  clearFormErrors(form);
  let valid = true;
  const fields = Array.from(form.querySelectorAll("[data-validate]"));

  fields.forEach((input) => {
    const rules = input.dataset.validate.split("|");
    const value = input.value;

    rules.forEach((rule) => {
      if (!valid && document.querySelector(`[data-error-for="${input.name}"]`)?.textContent) {
        return;
      }

      if (rule === "required" && !validateRequired(value)) {
        setFieldError(input, "Este campo es obligatorio.");
        valid = false;
      }

      if (rule === "email" && validateRequired(value) && !validateEmail(value)) {
        setFieldError(input, "Ingresa un correo valido.");
        valid = false;
      }

      if (rule === "password" && validateRequired(value) && !validatePassword(value)) {
        setFieldError(input, getPasswordMessage());
        valid = false;
      }
    });
  });

  return valid;
}

function bindAuthForms() {
  document.querySelectorAll("[data-auth-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!validateForm(form)) {
        return;
      }

      const type = form.dataset.authForm;

      if (type === "login") handleLogin(form);
      if (type === "register") handleRegister(form);
      if (type === "recovery") handleRecovery(form);
      if (type === "profile") handleProfile(form);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initStorage();
  bindAuthForms();
});
