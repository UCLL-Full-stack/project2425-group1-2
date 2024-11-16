import { UserShort } from "@/types";
import StudentLinkItem from "./StudentLinkItem";

interface StudentsLinksSectionProps {
  students: Array<UserShort>;
  isActive: boolean;
  url: string;
}

const StudentsLinksSection = ({
  students,
  isActive,
  url,
}: StudentsLinksSectionProps) => {
  return (
    <>
      <div className={`${isActive ? "" : "opacity-50"}`}>
        <h1 className="text-center mt-5">Choose a student</h1>
        {students && (
          <section className="ml-4 mr-64 mt-4 flex flex-row flex-wrap gap-8">
            {students.map((student) => {
              return (
                <div key={student.id} className="flex">
                  <StudentLinkItem
                    student={student}
                    href={`${url}/${student.id}`}
                    isActive={isActive}
                  />
                </div>
              );
            })}
          </section>
        )}
      </div>
    </>
  );
};

export default StudentsLinksSection;
