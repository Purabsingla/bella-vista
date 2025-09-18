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
