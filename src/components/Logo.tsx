import logo from '@/assets/images/logo.png';
import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <Link
      href="/"
      className="z-10 flex items-center gap-4">
      <Image
        src={logo}
        height="60"
        width="60"
        quality={100}
        alt="The Wild Oasis logo"
        priority
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
