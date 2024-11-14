import Link from "next/link";
import { ReactNode } from "react";

export const TextLink = ({
    children,
    icon,
    href,
    targetBlank = false,
}: {
    children?: ReactNode;
    icon?: ReactNode;
    href: string;
    targetBlank?: boolean;
}) => {
    return (
        <Link
            href={href}
            target={targetBlank ? "_blank" : undefined}
            className="flex items-center gap-2 hover:underline"
        >
            {icon && icon} {children}
        </Link>
    );
};
