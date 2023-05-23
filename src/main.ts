import express from "express";

import { petRouter } from "./pets/infrastructure/petRouter";

const app = express();

app.use(express.json());

app.use("/pets", petRouter);

app.listen(3000, () => {
  console.log(`[Application] Server online in port 3000`);
});


