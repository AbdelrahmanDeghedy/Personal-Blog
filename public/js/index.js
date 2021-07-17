document
  .querySelector(".form-container")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const content = document.querySelector("#content").value;

    const url = "http://127.0.0.1:3000/api/v1/blog/";
    const data = {
      title,
      description,
      content,
    };
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    if (response.status !== 200) {
      // catch an error
    }
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);

    console.log(response);
  });
