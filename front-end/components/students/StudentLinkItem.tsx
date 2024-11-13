import React from "react";
import { UserShort } from "@/types";
import Link from "next/link";

interface StudentLinkItemProps {
  student: UserShort;
  href: string;
  isActive: boolean;
}
const StudentLinkItem = ({ student, href, isActive }: StudentLinkItemProps) => {
  return (
    <>
      {student && (
        <Link
          href={href}
          className={`p-1 rounded shadow-regular bg-primary ${
            isActive
              ? "hover:shadow-success"
              : "opcaity-50 cursor-not-allowed"
          } align-top text-left w-64 h-64`}
          onClick={(e) => !isActive && e.preventDefault()}
        >
          <div className="flex flex-row justify-between p-2">
            <article className="flex flex-col gap-2 items-center">
              <p>{`Id: ${student.id}`}</p>
              <p>{student.name}</p>
            </article>
          </div>
        </Link>
      )}
    </>
  );
};

export default StudentLinkItem;
