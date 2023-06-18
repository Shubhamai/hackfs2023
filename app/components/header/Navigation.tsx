"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  const linkClassName = (href: string) =>
    `text-foreground/70 transition hover:text-foreground/90 ${
      pathname === href ? "text-primary" : ""
    }`;

  return (
    <NavigationMenu className="flex-initial">
      <NavigationMenuList className="px-4 py-2 gap-5">
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={linkClassName("/about")}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/explore" legacyBehavior passHref>
            <NavigationMenuLink className={linkClassName("/explore")}>
              Explore
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/providers" legacyBehavior passHref>
            <NavigationMenuLink className={linkClassName("/providers")}>
              Compute Providers
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
