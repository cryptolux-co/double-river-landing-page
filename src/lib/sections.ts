type Section<T extends string> = {
  path: `/${T}`;
  label: string;
  logo: {
    name: string;
    src: string;
    alt: string;
    path: `/${T}`;
  };
  pages: readonly { label: string; path: `/${T}` | `/${T}/${string}` }[];
};

export const investmentsSection = {
  path: "/investments",
  label: "Investments",
  logo: {
    name: "Investments",
    src: "/logos/double-river-investments-isologo.svg",
    alt: "Double River Investments",
    path: "/investments",
  },
  pages: [
    {
      label: "About",
      path: "/investments",
    },
    {
      label: "Strategies",
      path: "/investments/strategies",
    },
    {
      label: "Team",
      path: "/investments/team",
    },
    {
      label: "Contact Us",
      path: "/investments/contact-us",
    },
  ],
} as const satisfies Section<"investments">;

export const capitalSection = {
  path: "/capital",
  label: "Capital",
  logo: {
    name: "Capital",
    src: "/logos/double-river-capital-isologo.svg",
    alt: "Double River Capital",
    path: "/capital",
  },
  pages: [
    {
      label: "About",
      path: "/capital",
    },
    {
      label: "Services",
      path: "/capital/services",
    },
    {
      label: "Contact Us",
      path: "/capital/contact-us",
    },
  ],
} as const satisfies Section<"capital">;

export const impactSection = {
  path: "/impact",
  label: "Impact",
  logo: {
    name: "Impact",
    src: "/logos/double-river-impact-isologo.svg",
    alt: "Double River Impact",
    path: "/impact",
  },
  pages: [
    {
      label: "About",
      path: "/impact",
    },
  ],
} as const satisfies Section<"impact">;

export const logos = [investmentsSection.logo, capitalSection.logo, impactSection.logo] as const;

export const sections = [investmentsSection, capitalSection] as const;
