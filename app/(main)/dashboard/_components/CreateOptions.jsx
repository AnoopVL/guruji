// app/(main)/dashboard/_components/CreateOptions.jsx
import React from "react";
import { FaVideo } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";

function CreateOptions() {
  return (
    <div className="flex flex-row justify-between p-5 space-x-20">
      {/* Card 1 */}
      <Link
        href={"dashboard/create-interview"}
        className="flex flex-col bg-gray-100 w-full p-10 rounded-2xl space-y-4 
                      hover:bg-gray-200 hover:shadow-lg transition cursor-pointer">
        <div className="w-12 h-12 bg-green-100 rounded-lg inline-flex items-center justify-center">
          <FaVideo className="text-green-700 w-6 h-6" />
        </div>

        <h2 className="font-bold">Create New Interview</h2>
        <p className="text-gray-500">
          Create AI interviews and schedule them with candidates.
        </p>
      </Link>

      {/* Card 2 */}
      <div
        className="flex flex-col bg-gray-100 w-full p-10 rounded-2xl space-y-4 
                      hover:bg-gray-200 hover:shadow-lg transition">
        <div className="w-12 h-12 bg-green-100 rounded-lg inline-flex items-center justify-center">
          <FaPhoneAlt className="text-green-700 w-6 h-6" />
        </div>

        <h2 className="font-bold">Create Phone Screening Call</h2>
        <p className="text-gray-500">
          Schedule phone screening calls with potential candidates.
        </p>
      </div>
    </div>
  );
}

export default CreateOptions;
