import { ReactNode } from "react";

export const PostDescription = ({ children }: { children?: ReactNode }) => {
    return <p className="text-neutral-500 text-center pt-4">{children}</p>;
}