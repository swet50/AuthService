
// ── 1. Load environment variables FIRST (before any module reads them) ──
import "dotenv/config";

// ── 2. Core dependencies ──
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

// ── 3. Configuration (validates env vars at startup) ──
import { config } from "./src/config/env.js";

import authRoutes from "./src/routes/auth.route.js";



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.use("/api/auth", authRoutes);

app.listen(config.PORT, () => {
  console.log(`
  🚀 Charseva API running
  → Port:        ${config.PORT}
//   → Environment: ${config.NODE_ENV}
//   → CORS:        ${config.CORS_ORIGIN}
  `);
});


