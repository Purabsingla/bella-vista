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
  const orderPadValue = orderCount > 99 ? 1 : orderCount > 9 ? 2 : 3;
  return `ORD${String(orderCount).padStart(orderPadValue, "0")}`;
};

export const POST = async (request: Request) => {
  try {
    const reqData = await request.json();
    const {
      userId,
      customerName,
      items,
      orderType = "online",
      email,
      deliveryInfo,
    } = reqData;
    const today = new Date().toISOString().split("T")[0];
    console.log(reqData, await generateDailyOrderID());
    const docRef = await addDoc(collection(db, "orders"), {
      userId,
      customerName,
      email,
      items,
      orderType,
      deliveryInfo,
      orderId: await generateDailyOrderID(),
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

export const GET = async () => {
  try {
    const q = query(collection(db, "orders"));
    const snapshots = await getDocs(q);
    const orders = snapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      status: 200,
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error in Server",
      status: 500,
      success: false,
    });
  }
};
