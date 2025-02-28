import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Destination", href: "/destination" },
  { label: "Features", href: "/features" },
  {
    label: "Package",
    href: "#",
    submenu: [
      { label: "Packages", href: "/tours" },
      { label: "Package detail", href: "/tours/package_1" },
    ],
  },
  {
    label: "Blog",
    href: "#",
    submenu: [
      { label: "Blog", href: "/blog" },
      { label: "Blog detail", href: "/blog/blog_1" },
    ],
  },
  { label: "Contact", href: "/contact" },
  { label: "Documentation", href: "/documentation" },
];  