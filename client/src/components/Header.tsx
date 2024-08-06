"use client"

import Image from "next/image";
import Link from "next/link";
import PTECzestochowaLogo from "../assets/PTECzęstochowa/Logo_PTE_poziome_Czestochowa_e271bd3c00.png";
import PTESiedziba from "../assets/PTECzęstochowa/pte_siedziba.jpg";

const Header = () => {

  return (
    <header className="bg-[#fff]">
      <div className="max-w-[1320px] pt-0 hidden lg:flex mx-auto items-center justify-between">
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Link href={"/"} className="flex items-center">
                <Image src={PTECzestochowaLogo} alt="PTECzestochowaLogo" priority />
              </Link>
            </div>
            <div className="flex justify-center">
              <span className="ml:[40px]">
                <Image src={PTESiedziba} alt="PTE Siedziba" className="object-cover object-left-top" priority height={250} width={382} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
