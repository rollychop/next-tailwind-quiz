"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { MdQuiz } from "react-icons/md";

function Header() {
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const themSystem = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (theme) {
      document.documentElement.classList.add(theme);
    } else {
      setDarkMode(themSystem);
    }
  }, []);
  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="h-12 w-full flex flex-col justify-center bg-gray-200 dark:bg-gray-800">
      <nav className="flex justify-evenly px-16">
        <div>
          <Link href="/" className="flex">
            <div className="font-bold text-lg">NPTEL Exam Prep</div>
          </Link>
        </div>
        <div className="flex">
          <button className="mr-4 relative" onClick={toggleTheme}>
            {darkMode ? <MdLightMode size={25} /> : <MdDarkMode size={25} />}
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
