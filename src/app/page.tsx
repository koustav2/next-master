import { connectDB } from "@/lib/dbConnect";
import Image from "next/image";

export default async function Home() {
  connectDB();
  return (
    <></>
  );
}
