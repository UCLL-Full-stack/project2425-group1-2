import { MANAGE_ISP_URL, MANAGE_COURSES_URL, MANAGE_PROFILES_URL, MY_ISP_URL } from "@/utils/urls";

export type Tab = {
    name: string;
    href: string;
};

export const tabs: Tab[] = [
    { name: "My ISP", href: MY_ISP_URL },
    { name: "Manage ISP", href: MANAGE_ISP_URL },
    { name: "Manage Profiles", href: MANAGE_PROFILES_URL },
    { name: "Manage Courses", href: MANAGE_COURSES_URL },
];