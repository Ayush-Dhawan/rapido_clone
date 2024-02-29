import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

export default function NavBar() {
  return (
    <div className="flex justify-between items-center px-10 border-b-[1px] border-gray-500 shadow-sm">
      <div className="flex items-center justify-between gap-10">
        <Image src="/rapido_logo.png" alt="logo" width={100} height={50} />

        <ul className="flex items-center justify-between gap-9">
          <li className="hover:bg-slate-700 hover:cursor-pointer">Home</li>
          <li className="hover:bg-slate-700 hover:cursor-pointer">Help</li>
          <li className="hover:bg-slate-700 hover:cursor-pointer">
            <a
              href="https://donate.stripe.com/test_dR64ki6zS1B342k4gj"
              target="_blank"
            >
              Support us
            </a>
          </li>
        </ul>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
