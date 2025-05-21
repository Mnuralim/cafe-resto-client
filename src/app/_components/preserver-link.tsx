import { useSearchParams } from "next/navigation";
import Link, { LinkProps } from "next/link";
import React from "react";
import type { UrlObject } from "url";

type PreserveLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
};

export function PreserveLink({
  href,
  children,
  className,
  ...props
}: PreserveLinkProps) {
  const searchParams = useSearchParams();
  const currentParams = Object.fromEntries(searchParams.entries());

  const preservedHref: string | UrlObject =
    typeof href === "string"
      ? `${href}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
      : {
          pathname: href.pathname,
          query: {
            ...(typeof href === "object" &&
            "query" in href &&
            typeof href.query === "object"
              ? href.query
              : {}),
            ...currentParams,
          },
        };

  return (
    <Link href={preservedHref} className={className} {...props}>
      {children}
    </Link>
  );
}
