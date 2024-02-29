import React, { useState } from "react";
import cardList, { donateList } from "./cardsList";

import Image from "next/image";

export default function Cards() {
  const [selectedMethod, setSelectedMethod] = useState<number>();

  return (
    <div className="grid grid-cols-1">
      <div>
        <h2 className="text-[14px] font-semibold">Payment Methods</h2>
        <ul className="grid grid-cols-1">
          {cardList.map((card) => (
            <li
              className={`border-[1px] width-[15rem] m-2 flex flex-col text-center items-center justify-center border-gray-500 rounded-md cursor-pointer hover:scale-110 transition-all hover:border-yellow-400 ${
                card.id === selectedMethod && "bg-yellow-200 text-slate-800"
              }`}
              key={card.id}
              onClick={() => setSelectedMethod(card.id)}
            >
              <Image src={card.image} alt={card.name} width={50} height={60} />
              <span>{card.name}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* <div>
        <h2 className="text-[14px] font-semibold">Support Rapido</h2>
        <ul className="grid grid-cols-2">
          {donateList.map((card) => (
            <li
              className={`border-[1px] width-[15rem] m-2 flex flex-col text-center items-center justify-center border-gray-500 rounded-md cursor-pointer hover:scale-110 transition-all hover:border-yellow-400 ${
                card.id === selectedMethod && "bg-yellow-200 text-slate-800"
              }`}
              key={card.id}
              onClick={() => setSelectedMethod(card.id)}
            >
              <Image src={card.image} alt={card.name} width={50} height={60} />
              <span>{card.name}</span>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
