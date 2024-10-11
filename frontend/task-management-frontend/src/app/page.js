import Image from "next/image";
import Card from "./components/card";

export default function Home() {
  return (
    <div className="bg-neutralGray-300">
      <div className="w-11/12 h-full">
        {/* Head text */}
        <div className={`w-full`}>
          <p className={`p-8 text-[26px] md:text-[30px] text-black font-[500]`}>Strona główna</p>
        </div>
      </div>

      <div className={`w-11/12 grid overflow-auto grid-cols-1 md:grid-cols-4 mx-auto gap-4`}>

        {/* Columns */}
        {/* TODO fetch it from backend and send proper card data to show it to user. */}
        <Card/>

      </div>
      
    </div>
  );
}
