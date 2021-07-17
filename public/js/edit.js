import { save } from "./index.js";

save(
  "PATCH",
  `http://127.0.0.1:3000/api/v1/blog/edit/${
    window.location.pathname.split("/")[2]
  }`
);
