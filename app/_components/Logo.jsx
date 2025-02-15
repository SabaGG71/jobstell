import Image from "next/image";
import logo from "../../public/logo.svg";
import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link href="/">
        <Image
          quality={100}
          width={125}
          height={125}
          src={logo}
          alt="logo"
          priority
        />
      </Link>
    </div>
  );
}
