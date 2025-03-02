import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {

  return (
    <Link href="/">
      <Image
        src="/images/logo/logo.svg"
        alt="logo"
        width={250}
        height={40}
        style={{ width: '250px', height: '70px' }}
        quality={100}
        className='dark:hidden'
      />
      <Image
        src="/images/logo/logo-white.svg"
        alt="logo"
        width={250}
        height={40}
        style={{ width: '250px', height: '70px' }}
        quality={100}
        className='dark:block hidden'
      />
    </Link>
  );
};

export default Logo;
