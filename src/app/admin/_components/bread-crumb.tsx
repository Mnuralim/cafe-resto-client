"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";

export function Breadcrumb() {
  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter((part) => part !== "" && part !== "admin");

  const labelMap: Record<string, string> = {
    orders: "Orders",
    "data-orders": "Data Orders",
  };

  const pathLinks = pathParts.map((part, index) => {
    const href = `/admin/${pathParts.slice(0, index + 1).join("/")}`;
    const label = labelMap[part] || part.replace(/-/g, " ");

    return {
      href,
      label,
    };
  });

  if (pathname === "/admin/login") {
    return null;
  }

  return (
    <nav
      className="flex p-4 md:p-6 bg-gray-100 overflow-x-auto"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2 whitespace-nowrap">
        <li className="inline-flex items-center">
          <Link
            href="/admin"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#3533A1]"
          >
            <FaHome className="mr-1 md:mr-2" />
            <span className="hidden xs:inline">Dashboard</span>
          </Link>
        </li>

        {pathLinks.map((item, index) => {
          const isLast = index === pathLinks.length - 1;
          return (
            <li key={item.href} className="inline-flex items-center">
              <span className="mx-1 md:mx-2 text-gray-500">/</span>
              {isLast ? (
                <span className="text-sm font-medium text-[#3533A1] capitalize">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-[#3533A1] capitalize"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
