import googleLogo from '@/assets/svg/google-logo.svg';
import { signInAction } from '@/lib/action';
import Image from 'next/image';

export default function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 border border-primary-300 px-10 py-4 text-lg font-medium">
        <Image
          src={googleLogo}
          alt="Google logo"
          height={24}
          width={24}
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}
