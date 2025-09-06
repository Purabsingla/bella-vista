import { NextResponse } from "next/server";
import { db } from "@/firebase/firebase"; // your firestore config
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { auth } from "@/firebase/firebase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      name,
      email,
      phone,
      date,
      time,
      partySize,
      specialRequests,
    } = body;

    if (!userId || !name || !email || !phone || !date || !time || !partySize) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Received reservation:", body);

    // const docRef = await addDoc(collection(db, "reservations"), {
    //   userId,
    //   name,
    //   email,
    //   phone,
    //   date,
    //   time,
    //   partySize,
    //   specialRequests: specialRequests || "",
    //   createdAt: serverTimestamp(),
    // });

    return NextResponse.json({ success: true });
    // id: docRef.id
  } catch (error) {
    console.error("Error saving reservation:", error);
    return NextResponse.json(
      { error: "Failed to save reservation" },
      { status: 500 }
    );
  }
}
