import { Role } from "@/types";
import Link from "next/link";
import React from "react";

interface HeaderProfileButtonProps {
  email: string;
  role: Role;
  href: string;
}

const sharedClassOptions =
  "p-2 rounded-full w-12 h-12 text-center shadow-regular";

const roleOptions = {
  student: {
    class: "bg-indigo-950 hover:shadow-success",
  },
  admin: {
    class: "bg-success hover:shadow-safe",
  },
  none: {
    class: "",
  },
};

const HeaderProfileButton = ({
  email,
  role,
  href,
}: HeaderProfileButtonProps) => {
  const buttonClass = `${sharedClassOptions} ${roleOptions[role].class}`;
  const buttonHref = `${href}/${email}`;

  return (
    <Link href={buttonHref} className={buttonClass}>
      {email ? email[0].toUpperCase() : ""}
    </Link>
  );
};

export default React.memo(HeaderProfileButton);
