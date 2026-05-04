import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || "mongodb://shubham992284_db_user:JDe284bwer0hqSPM@ac-znpqavh-shard-00-00.ktjnehe.mongodb.net:27017,ac-znpqavh-shard-00-01.ktjnehe.mongodb.net:27017,ac-znpqavh-shard-00-02.ktjnehe.mongodb.net:27017/?ssl=true&replicaSet=atlas-wcdytt-shard-0&authSource=admin&appName=Cluster0"
if (!uri) throw new Error('MONGODB_URI environment variable is not set')

let cachedClient = null

export async function getDb(dbName = 'svatantra') {
  if (!cachedClient) {
    cachedClient = await new MongoClient(uri).connect()
  }
  return cachedClient.db(dbName)
}
