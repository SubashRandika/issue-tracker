"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 mb-5 border-b h-14 items-center px-6">
      <Link href="/">
        <AiFillBug fontSize={30} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              className={classnames({
                "underline decoration-solid underline-offset-[6px] decoration-2 decoration-teal-600":
                  link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-900 hover:underline-offset-[8px] hover:decoration-wavy transition-all":
                  true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
