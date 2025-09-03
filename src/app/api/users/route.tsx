import { NextResponse } from "next/server";
import { db } from "@/firebase/firebase"; // your firestore config
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { uid, email, name, role } = body;

    if (!uid || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await setDoc(doc(db, "users", uid), {
      uid,
      email,
      name,
      role: role || "user",
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error saving user:", err);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
