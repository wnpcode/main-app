import React from "react";

export default function Sidebar() {
  return (
    <div className="flex h-[10vh] bg-blue-500 w-full">
      <div className="text-3xl font-light flex w-[100%] items-center justify-center p-5 text-white">
        @ Main App {new Date().getFullYear()}
      </div>
    </div>
  );
}
