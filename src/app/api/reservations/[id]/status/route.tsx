import { NextResponse } from "next/server";
import { db } from "@/firebase/firebase"; // your firebase config
import { doc, updateDoc } from "firebase/firestore";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    console.log(id, status);

    if (!id || !status) {
      return NextResponse.json(
        { error: "Reservation ID and status are required" },
        { status: 400 }
      );
    }

    const reservationRef = doc(db, "reservations", id);
    await updateDoc(reservationRef, { status });

    return NextResponse.json({ success: true, id, status });
  } catch (error) {
    console.error("Error updating reservation:", error);
    return NextResponse.json(
      { error: "Failed to update reservation" },
      { status: 500 }
    );
  }
}
