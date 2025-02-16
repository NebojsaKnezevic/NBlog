import "server-only"
import { Db, MongoClient, ServerApiVersion, Collection } from "mongodb"

if(!process.env.DB_URI)
{
    throw new Error("Mongo env connection string not found!");
}

const client = new MongoClient(process.env.DB_URI,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
})

async function getDB(dbName: string): Promise<Db | null> {
    try {
        await client.connect();
        console.log(">>>>>CONNTECTED TO MONGO<<<<<")
        return client.db(dbName)
    } catch (error) {
        console.log(error)
        return null;
    }
}

export async function getCollection(collectionName: string): Promise<Collection | null> {

    const db = await getDB("next_blog_db");
    if(db) return db.collection(collectionName);
    console.log("getCollection is null")
    return null;
}