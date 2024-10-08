import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dbConnect } from "./src/infrastructure/config/dbConnection";
import userAuthRoute from "./src/presentation/routes/userAuthRoutes";
import cors from "cors";
import adminRouter from "./src/presentation/routes/adminRoutes";
import counsellorRouter from "./src/presentation/routes/counsellorRoutes";
import router from "./src/presentation/routes/unProtectedRoutes";
import http from "http";
import configureSocket from "./src/infrastructure/config/socketIoConfig";
import {
  errorHandler,
  notFound,
} from "./src/infrastructure/middleware/errorHandler";
import verifyPaymentRouter from "./src/presentation/routes/verfiyroute";

dotenv.config();
dbConnect();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api", verifyPaymentRouter);

app.use(express.json({ limit: "50mb" })); // to accept json data
app.use(express.urlencoded({ limit: "50mb", extended: true })); //extract url data
app.use(cookieParser());

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = configureSocket(server);

app.set("io", io);

server.listen(port, () => {
  console.log(`server running on the port ${port}`);
});

app.use("/api", router);
app.use("/api/user", userAuthRoute);
app.use("/api/admin", adminRouter);
app.use("/api/counsellor", counsellorRouter);

// Catch-all for undefined routes
app.use(notFound);

// Error handling middleware
app.use(errorHandler);
