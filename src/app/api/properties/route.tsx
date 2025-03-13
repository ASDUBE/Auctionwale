import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Auctionwale"); // ✅ Ensure database name is correct

    const properties = await db.collection("properties").find({}).toArray();

    return NextResponse.json(properties, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error fetching properties:", error);
    return NextResponse.json(
      { error: `Error fetching properties: ${error.message}` },
      { status: 500 }
    );
  }
}
