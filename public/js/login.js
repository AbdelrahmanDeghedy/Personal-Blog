document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const url = `http://127.0.0.1:3000/api/v1/user/login`;
  const data = {
    email,
    password,
  };

  let response;
  try {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "https://deghedeeaat.herokuapp.com");

    response = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: headers,
      body: JSON.stringify(data),
    });

    await response.json();
  } catch (err) {
    console.log(err);
  }

  if (response.status === 200) {
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }
});
