import { MongoClient } from "mongodb";

const uri = "mongodb+srv://manishgupt7255_db_user:MG9WsJYiiJ3UFtJl@aihabittracker.rtdbyml.mongodb.net/?appName=Aihabittracker";

const client = new MongoClient(uri);

try {
  await client.connect();
  console.log("Connected!");
} catch (err) {
  console.error(err);
} finally {
  await client.close();
}