import { useState } from 'react';
import Link from 'next/link';
import { HeaderItem } from '../../../../types/menu';
import { usePathname } from 'next/navigation';

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const path = usePathname();

  return (
    <div className="relative w-full">
      <Link href={item.href}
        onClick={item.submenu ? handleToggle : undefined}
        className={`flex items-center justify-between w-full py-2 px-3 rounded-md text-black hover:bg-gray-300 dark:hover:bg-gray-800 dark:text-white  focus:outline-none ${path === item.href ? 'bg-primary text-white dark:text-white dark:!text-opacity-100' : ' text-black dark:text-grey'} ${path.startsWith(`/${item.label.toLowerCase()}`) ? "!bg-primary text-white dark:text-white dark:!text-opacity-100" : ""}`}
      >
        {item.label}
        {item.submenu && (
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10l5 5l5-5" />
          </svg>
        )}
      </Link>
      {submenuOpen && item.submenu && (
        <div className="bg-white dark:bg-darkmode p-2 w-full">
          {item.submenu.map((subItem, index) => (
            <Link key={index} href={subItem.href} className={` ${subItem.href === path ? '!text-primary ' : null} block py-2 px-3 text-gray-800 dark:text-grey `}>
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
