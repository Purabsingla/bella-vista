import { db } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

const generateDailyOrderID = async () => {
  const today = new Date().toISOString().split("T")[0];

  const q = query(collection(db, "orders"), where("date", "==", today));
  const snapshots = await getDocs(q);
  const orderCount = snapshots.empty ? 1 : snapshots.size + 1;
  const orderPadValue = orderCount > 99 ? 3 : orderCount > 9 ? 4 : 5;
  return `ORD${String(orderCount).padEnd(orderPadValue, "0")}`;
};

export const POST = async (request: Request) => {
  try {
    const reqData = await request.json();
    const { userId, customerName, items } = reqData;
    const today = new Date().toISOString().split("T")[0];

    const docRef = await addDoc(collection(db, "orders"), {
      userId,
      orderId: generateDailyOrderID() || "ORD001",
      customerName,
      items,
      orderType: "online",
      date: today,
      createdAt: serverTimestamp(),
      status: "pending", //initial status
    });

    return NextResponse.json({ status: 200, success: true, id: docRef.id });
  } catch (error) {
    console.log("Error in orders route", error);
    return NextResponse.json({
      message: "Internal Server Error",
      staus: 500,
      success: false,
    });
  }
};
