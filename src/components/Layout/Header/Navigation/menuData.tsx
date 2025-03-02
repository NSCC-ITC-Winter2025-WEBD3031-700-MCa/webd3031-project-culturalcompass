import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Destination", href: "/destination" },
  { label: "Features", href: "/features" },
  {
    label: "Blog",
    href: "#",
    submenu: [
      { label: "Blog", href: "/blog" },
      { label: "Blog detail", href: "/blog/blog_1" },
    ],
  },
];  