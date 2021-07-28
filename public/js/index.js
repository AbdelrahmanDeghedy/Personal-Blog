const save = function (method, url) {
  const mixedLang = document.querySelector(".mixed-lang");
  const englishLang = document.querySelector(".english-lang");
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const content = document.getElementById("content");

  let mixedLanguage = false;

  mixedLang.addEventListener("click", (e) => {
    e.preventDefault();
    mixedLang.disabled = true;
    englishLang.disabled = false;

    title.setAttribute("dir", "rtl");
    description.setAttribute("dir", "rtl");
    content.setAttribute("dir", "rtl");

    mixedLanguage = true;
  });

  englishLang.addEventListener("click", (e) => {
    e.preventDefault();
    englishLang.disabled = true;
    mixedLang.disabled = false;

    title.setAttribute("dir", "ltr");
    description.setAttribute("dir", "ltr");
    content.setAttribute("dir", "ltr");

    mixedLanguage = false;
  });

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
        mixedLanguage,
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
    });
};

export { save };
