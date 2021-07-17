const save = function (method, url) {
  document
    .querySelector(".form-container")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const title = document.querySelector("#title").value;
      const description = document.querySelector("#description").value;
      const content = document.querySelector("#content").value;

      const data = {
        title,
        description,
        content,
      };
      const response = await fetch(url, {
        method,
        mode: "cors",
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
};

export { save };
