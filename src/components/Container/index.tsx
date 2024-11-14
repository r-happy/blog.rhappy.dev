import { ReactNode } from "react";

export const Container = ({ children }: { children?: ReactNode }) => {
    return (
        <div className="mx-auto w-[95%] md:max-w-[560px] lg:max-w-[720px]">
            {children}
        </div>
    );
};
