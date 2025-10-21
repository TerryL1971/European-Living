import express from "express";
import cors from "cors";
import { createClient } from "@sanity/client";

const app = express();
app.use(cors());
app.use(express.json());

const sanity = createClient({
  projectId: "n0sgaoxc",
  dataset: "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

app.post("/api/createDoc", async (req, res) => {
  try {
    const doc = await sanity.create(req.body);
    res.status(200).json(doc);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3001, () => console.log("API running on http://localhost:3001"));
