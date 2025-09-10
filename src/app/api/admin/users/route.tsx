import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase";

export default async function POST(request: Request) {
  try {
    // Collecting data from request body
    const { name, email, password, role = "employee" } = await request.json();
    const userCred = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });
    // Save extra details in Firestore
    await adminDb
      .collection("users")
      .doc(userCred.uid)
      .set({
        uid: userCred.uid,
        name,
        email,
        role: role || "employee",
        createdAt: new Date(),
        lastLogin: null, // will be updated later when they log in
      });

    return NextResponse.json({ success: true, uid: userCred.uid });
  } catch (error) {
    console.log("Error in fetching users:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
