import React from "react";

export default function Footer() {
  return (
    <div className="flex bg-blue-500 w-screen bottom-0 absolute">
      <div className="text-base font-light flex w-[99%] items-center justify-center p-2 text-white">
        @ Main App {new Date().getFullYear()}
      </div>
    </div>
  );
}
