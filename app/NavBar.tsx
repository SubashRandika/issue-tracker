"use client";

import { Avatar, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="mb-5 border-b p-4">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="6">
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
          </Flex>
          <Flex>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    className="cursor-pointer"
                    size="2"
                    radius="full"
                    src={session.user!.image!}
                    fallback="?"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item className="w-full">
                    <Flex width="100%" align="center" justify="between">
                      <Link href="/api/auth/signout">Log out</Link>
                      <FiLogOut fontSize={18} />
                    </Flex>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
