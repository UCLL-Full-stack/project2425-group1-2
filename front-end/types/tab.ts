import { COMPOSE_ISP_URL, VIEW_ISP_URL, PAYMENTS_URL, MANAGE_COURSES_URL, MANAGE_PROFILES_URL } from "@/utils/urls";

export type Tab = {
    name: string;
    href: string;
};

export const tabs: Tab[] = [
    { name: "Compose ISP", href: COMPOSE_ISP_URL },
    { name: "View my ISP", href: VIEW_ISP_URL },
    { name: "Payments", href: PAYMENTS_URL },
    { name: "Manage Profiles", href: MANAGE_PROFILES_URL },
    { name: "Manage Courses", href: MANAGE_COURSES_URL },
];