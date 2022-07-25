import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-sm text-center py-6 fixed bottom-0 w-full left-0 z-[10000]">
      Powered By:{"   "}
      <Link href="https://planetscale.com/" passHref>
        <a
          className="underline underline-offset-2 text-[#2B7FFF] "
          target="_blank"
        >
          Planetscale
        </a>
      </Link>{" "}
      &{"  "}
      <Link href="https://hashnode.com/" passHref >
        <a className="underline underline-offset-2 text-[#2B7FFF]" target="_blank">Hashnode</a>
      </Link>
    </footer>
  );
};

export default Footer;
