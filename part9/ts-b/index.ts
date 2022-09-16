import express from "express";
import type { ErrorRequestHandler } from "express";
import { bmiMain } from "./bmiCalculator";
import { exMain } from "./exerciseCalculator";

const app = express();

app.use(express.json());
app.set("query parser", "extended");

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const ans = bmiMain(req.query);
  res.send(ans);
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const ans = exMain(req.body);
  res.send(ans);
});

app.use((_req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
});

const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, next) => {
  if (error instanceof Error) {
    return res.status(400).send({ error: error.message });
  }

  return next();
};
app.use(errorHandler);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}\nURL: http://localhost:${PORT}/`);
});
