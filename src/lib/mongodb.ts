import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("🚨 Please add your MongoDB URI to .env.local");
}

const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
  tls: true,
  tlsAllowInvalidCertificates: false, // ❌ Ensure valid TLS certificates
  minDHSize: 1024, // ✅ Increase DH key size to avoid SSL errors
  connectTimeoutMS: 30000, // ✅ Increase connection timeout
});

const clientPromise = client.connect();
export default clientPromise;
