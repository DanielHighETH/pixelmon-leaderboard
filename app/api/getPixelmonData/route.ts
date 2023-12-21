import { NextResponse, NextRequest } from 'next/server'
import connectToDB, { database } from '@/app/lib/connectToDB'

connectToDB();

export async function GET(req: NextRequest) {
    const pixelmonData = await database.collection("pixelmon").find().toArray();
    return NextResponse.json(pixelmonData);
}