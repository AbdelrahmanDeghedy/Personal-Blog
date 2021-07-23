document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const url = `https://deghedeeaat.herokuapp.com/login`;
  const data = {
    email,
    password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    await response.json();
  } catch (err) {
    console.log(err);
  }

  // if (response.status === 200) {
  //   setTimeout(() => {
  //     window.location.href = "/";
  //   }, 1000);
  // }
});
