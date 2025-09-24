import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase";

export async function GET() {
  try {
    // Fetch all users from Firestore
    const snapshot = await adminDb.collection("reservations").get();

    const reservations = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() || null,
      };
    });

    return NextResponse.json({ success: true, reservations });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Collecting data from request body
    const { userId, name, email, phone, date, time, guests, notes } =
      await request.json();
    // Store Reservation details in Firestore
    await adminDb.collection("reservations").doc(userId).set({
      userId,
      name,
      email,
      phone,
      date,
      time,
      guests,
      specialRequest: notes,
      createdAt: new Date(),
      status: "pending",
    });

    return NextResponse.json({ success: true, message: "reservation added" });
  } catch (error) {
    console.log("Error in fetching users:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
