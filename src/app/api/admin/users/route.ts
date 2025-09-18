import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase";

export async function POST(request: Request) {
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

export async function GET() {
  try {
    // Fetch all users from Firestore
    const snapshot = await adminDb.collection("users").get();

    const users = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() || null,
        lastLogin: data.lastLogin?.toDate().toISOString() || null,
      };
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
