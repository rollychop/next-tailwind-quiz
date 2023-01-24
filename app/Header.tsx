"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { MdQuiz } from "react-icons/md";

function Header() {
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    const ht = document.getElementsByTagName("html")[0];
    const classList = ht.classList;
    setDarkMode(classList.contains("dark"));
  }, []);
  const tooltip = useRef<HTMLSpanElement>(null);

  return (
    <header className="h-12 w-full flex flex-col justify-center bg-gray-200 dark:bg-gray-800">
      <nav className="flex justify-evenly px-16">
        <div>
          <Link href="/" className="flex">
            <div className="font-bold text-lg">NPTEL Exam Prep</div>
          </Link>
        </div>
        <div className="flex">
          <button
            className="mr-4 relative"
            onMouseOver={(e) => {
              tooltip.current?.classList.remove("hidden");
            }}
            onMouseLeave={() => tooltip.current?.classList.add("hidden")}
            onClick={() => {
              const ht = document.getElementsByTagName("html")[0];
              if (darkMode) {
                ht.classList.remove("dark");
              } else {
                ht.classList.add("dark");
              }
              setDarkMode(!darkMode);
            }}
          >
            {darkMode ? <MdLightMode size={25} /> : <MdDarkMode size={25} />}
            <span
              className="absolute hidden z-10 w-max bg-gray-300 rounded-md px-2 py-1 top-10 left-[-10] dark:bg-black"
              ref={tooltip}
            >
              {darkMode ? "Trun Light Mode" : "Trun Dark Mode"}
            </span>
          </button>
          <div className="font-bold text-lg">
            <Link href="/quiz">
              <span className="md:hidden">
                <MdQuiz size={25} />
              </span>
              <span className="hidden md:inline-block">Start Quiz</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
