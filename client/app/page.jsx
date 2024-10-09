import Link from "next/link";
import Homepage from "./components/Homepage";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="w-full min-h-[100vh]">
      <Homepage />
    </div>
  );
}
