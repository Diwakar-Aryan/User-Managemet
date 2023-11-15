import App from "./app";
import AuthRoutes from "./routes/auth.routes";
import MongoClientClass from "./databases/mongo/setup";
// import { findOne, insertOne } from "./databases/mongo/method";
async function startServer() {
  try {
    await MongoClientClass.initialize().initializeMongoConnection();
    // await findOne("testConnect");
    let userData = {
      user_name: "diw",
      user_email: "diwa@gmail.com",
      password: "Asd",
      created_at: new Date(),
      updated_at: new Date(),
      expiry: new Date(),
    };

    // await insertOne("user", userData);
    const app = new App([new AuthRoutes()]);
    await app.listen();
  } catch (error) {
    console.log(`Errored out in server ${error}`);
  }
}
startServer();
