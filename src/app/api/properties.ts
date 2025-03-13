import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

interface Property {
  ID: string;
  Property_Type: string;
  Property_Address: string;
  Current_Auction_Reserve_Price: number;
  Image_Url: string;
  // Add additional fields as needed
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Property[] | { error: string }>
) {
  try {
    const client = await clientPromise;
    // Use your actual database name "Auctionwale" here.
    const db = client.db('Auctionwale');
    const properties = await db
      .collection<Property>('properties')
      .find({})
      .toArray();

    // Optionally remove the _id field if needed
    const mappedProperties = properties.map(({ _id, ...rest }) => rest);
    res.status(200).json(mappedProperties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Error fetching properties' });
  }
}