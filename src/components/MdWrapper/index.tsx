import { ReactNode } from "react";

export const MdWrapper = ({ children }: { children: ReactNode }) => {
    return <div className="markdown">{children}</div>;
};
