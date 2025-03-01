"use client"
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { HeaderItem } from '../../../../types/menu';
import { usePathname } from 'next/navigation';



const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [menuItem , setMenuItem] = useState("");
  let submenupath

  const path = usePathname()
  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };
  

   const handleRefresh = () => {
    setMenuItem("");
   }


  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleRefresh}
      className={`${item?.submenu ? "relative" : ""}`}
    >
      <Link href={item.href} className={`text-base py-2 flex font-normal text-midnight_text hover:text-primary dark:hover:text-primary ${path === item.href ? 'text-primary' : ' text-black dark:text-white '} ${path.startsWith(`/${item.label.toLowerCase()}`) ? "!text-primary" : ""}`}>
        {item.label}
        {item.submenu && (
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10l5 5l5-5" />
          </svg>
        )}
      </Link>

      {submenuOpen && (
        <div className="absolute py-2 left-0 mt-0.5 top-8 w-60 bg-white dark:bg-darkmode shadow-lg dark:shadow-darkmd rounded-lg">
          {item.submenu?.map((subItem, index) => (
            <Link key={index} href={subItem.href}  className={` ${subItem.href === path ? 'bg-primary text-white dark:text-white hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white' : null} block px-4 py-2  hover:bg-gray-200 dark:hover:bg-darklight`}>
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
};

export default HeaderLink;
