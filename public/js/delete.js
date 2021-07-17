document.querySelector(".option-yes").addEventListener("click", async () => {
  const url = `http://127.0.0.1:3000/api/v1/blog/delete/${
    window.location.pathname.split("/")[2]
  }`;
  const response = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

  if (response.status === 200) {
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }
});

document.querySelector(".option-no").addEventListener("click", () => {
  window.location.href = "/";
});
