import { ReactNode } from "react";

export const PostDate = ({ children }: { children?: ReactNode }) => {
    return <p className="text-neutral-500 text-center">{children}</p>;
}