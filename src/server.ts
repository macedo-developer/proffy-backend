import express, { response } from "express";

const app = express();

app.use(express.json());

app.get("/users", (request, response) => {
  return response.json({ messase: "Hello Word" });
});

const port = 3002;
app.listen(port);
