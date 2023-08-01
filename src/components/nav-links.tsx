import type React from "react";
import { cn } from "@utils/cn";
import { pages, sections } from "@lib/sections";

export const NavLinks: React.FC = () => {
  const currentPath = window.location.pathname;
  const currentSection = sections.find((section) => currentPath.startsWith(section.path));
  const currentPage = pages.find((page) => currentPath === page.path);

  return (
    <div className="flex items-center justify-center gap-2">
      {currentSection?.pages.map(({ label, path }) => {
        return (
          <a
            key={path}
            className={cn(
              "rounded-[0.5rem] px-2.5 py-1 text-center text-sm font-medium sm:text-lg",
              {
                "text-investments": currentSection?.path === "/investments",
                "bg-investments-muted":
                  currentPage?.path === path && currentSection?.path === "/investments",
                "text-capital": currentSection?.path === "/capital",
                "bg-capital-muted":
                  currentPage?.path === path && currentSection?.path === "/capital",
                "text-impact": currentSection?.path === "/impact",
                "bg-impact-muted": currentPage?.path === path && currentSection?.path === "/impact",
              },
            )}
            href={path}
          >
            {label}
          </a>
        );
      })}
    </div>
  );
};
