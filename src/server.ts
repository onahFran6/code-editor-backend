import app from "./app";
import { sequelize } from "./models";

const startServer = async () => {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");

    // Start Express server
    const server = app.listen(app.get("port"), () => {
      console.log(
        `App is running at http://localhost:${app.get("port")} in ${app.get(
          "env"
        )} mode`
      );
      console.log("Press CTRL-C to stop");
    });

    // Gracefully handle server termination
    process.on("SIGINT", () => {
      server.close(() => {
        console.log("Server terminated");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
