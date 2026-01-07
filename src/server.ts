import app from "./app";
import connectDB from "./lib/conectDB";
import { seedSuperAdmin } from "./lib/seedSuperAdmin";

import { envVariables } from "./config";

let server;
const port = envVariables.PORT || 3000;
const bootstrap = async () => {
  try {
    await connectDB();
    await seedSuperAdmin();

    server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

bootstrap();
