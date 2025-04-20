import React from "react";
import Image from "next/image";

function Interview() {
  return (
    <div className="px-10 md:px-28 lg:px48 xl:px-64 mt-10">
      <div className="flex flex-col items-center justify-center border rounded-xl bg-gray-100 p-7 shadow-xl gap-2">
        <div className="flex flex-row items-center space-x-1 p-4">
          <Image
            src="/gurujiLogoSm.png"
            alt="logo small"
            width={40}
            height={40}
          />
          <div className="text-2xl text-green-700">GURUJI</div>
        </div>
        <Image
          src="/joinInterview.png"
          alt="joinInterview"
          width={600}
          height={200}
          className="rounded-xl"
        />
        <h2 className="font-bold text-lg">Full stack developer interview</h2>
      </div>
    </div>
  );
}

export default Interview;
