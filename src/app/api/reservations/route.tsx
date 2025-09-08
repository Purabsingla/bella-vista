import { NextResponse } from "next/server";
import { db } from "@/firebase/firebase"; // your firestore config
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, name, email, phone, date, time, guests, specialRequests } =
      body;

    console.log("Received reservation:", body);

    if (!userId || !name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "reservations"), {
      userId,
      name,
      email,
      phone,
      date,
      time,
      guests,
      specialRequests: specialRequests || "",
      createdAt: serverTimestamp(),
      status: "pending", //initial status
    });

    return NextResponse.json({ status: 200, success: true, id: docRef.id });
  } catch (error) {
    console.error("Error saving reservation:", error);
    return NextResponse.json(
      { error: "Failed to save reservation" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const reservationsRef = collection(db, "reservations");
    const q = query(reservationsRef, where("userId", "==", userId));

    const snapshot = await getDocs(q);

    const reservations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ reservations });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    );
  }
}
