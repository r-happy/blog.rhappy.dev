import { ReactNode } from "react";

export const PostTitle = ({ children }: { children?: ReactNode }) => {
    return <h1 className="text-3xl font-bold text-center">{children}</h1>;
}