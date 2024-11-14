import { GoHome, GoPerson } from "react-icons/go";
import { TextLink } from "../TextLink";

export const Header = () => {
    return (
        <div
            className={`w-full py-4 flex justify-around items-center border-neutral-300 sticky top-0 left-0 z-50 backdrop-blur-md font-semibold`}
        >
            <TextLink href="/" icon={<GoHome fontSize={20} />}>
                blog.rhappy.dev
            </TextLink>

            <div>
                <TextLink
                    href="https://rhappy.dev"
                    icon={<GoPerson fontSize={20} />}
                    targetBlank={true}
                >
                    about
                </TextLink>
            </div>
        </div>
    );
};
