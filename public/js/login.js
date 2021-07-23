document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const url = `http://127.0.0.1:3000/api/v1/user/login`;
  const data = {
    email,
    password,
  };
  const response = await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 200) {
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }
});
