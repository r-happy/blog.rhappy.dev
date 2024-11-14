import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import { read } from "to-vfile";
import { unified } from "unified";
import remarkFrontmatter from "remark-frontmatter";
import parse from "html-react-parser";
import path from "path";
import { MdWrapper } from "@/components/MdWrapper";
import { PostTitle } from "@/components/PostTitle";
import { PostDescription } from "@/components/PostDescription";
import { PostDate } from "@/components/PostDate";
import { TextLink } from "@/components/TextLink";
import NotFound from "../../not-found";
import { GoChevronLeft } from "react-icons/go";
import { Divider } from "@/components/Divider";
import { Node, Parent } from "unist";
import { Heading, Text } from "mdast";

type PostMetaProps = {
    title: string;
    date: string;
    description: string;
};

type TocItem = {
    text: string;
    id: string;
    depth: number;
};

const LoadMdx = async (postId: string, meta: PostMetaProps, toc: TocItem[]) => {
    const filePath = path.join(process.cwd(), "posts", `${postId}.mdx`);
    console.log("Attempting to load file from:", filePath);

    try {
        const file = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkFrontmatter, { type: "yaml", marker: "-" })
            .use(function () {
                return function (tree: Parent) {
                    // Look for YAML frontmatter and headings
                    const yamlNode = tree.children.find(
                        (node: Node) => node.type === "yaml"
                    ) as Node & { value: string };

                    // Process YAML frontmatter
                    if (yamlNode) {
                        const data = yamlNode.value;
                        const titleMatch = data.match(/title:\s*(.*)/);
                        const dateMatch = data.match(/date:\s*(.*)/);
                        const descriptionMatch =
                            data.match(/description:\s*(.*)/);

                        if (titleMatch) meta.title = titleMatch[1].trim();
                        if (dateMatch) meta.date = dateMatch[1].trim();
                        if (descriptionMatch)
                            meta.description = descriptionMatch[1].trim();
                    }

                    // Generate TOC from headings
                    tree.children.forEach((node: Node) => {
                        if (node.type === "heading") {
                            const headingNode = node as Heading;
                            const textNode = headingNode.children.find(
                                (child: Node) => child.type === "text"
                            ) as Text;

                            if (textNode) {
                                const text = textNode.value;
                                const id = text
                                    .toLowerCase()
                                    .replace(/\s+/g, "-");
                                toc.push({
                                    text,
                                    id,
                                    depth: headingNode.depth,
                                });
                            }
                        }
                    });
                };
            })
            .use(remarkRehype)
            .use(rehypeSlug)
            .use(rehypeStringify)
            .process(await read(filePath));

        return String(file.value);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
            console.log(`File not found for postId ${postId}.`);
            return null;
        } else {
            console.error(`Error loading file for postId ${postId}:`, error);
        }
    }
};

type PageProps = {
    params: Promise<{ postId: string }>;
};

export default async function Page({ params }: PageProps) {
    const postMeta: PostMetaProps = { title: "", date: "", description: "" };
    const toc: TocItem[] = [];
    const { postId } = await params;
    const mdxContent = await LoadMdx(postId, postMeta, toc);

    if (!mdxContent) {
        return (
            <div>
                <NotFound />
            </div>
        );
    }

    const mdx = parse(mdxContent);

    return (
        <div className="p-4">
            <div>
                <PostTitle>{postMeta.title}</PostTitle>
                <PostDescription>{postMeta.description}</PostDescription>
                <PostDate>{postMeta.date}</PostDate>
            </div>
            <div className="toc p-4 bg-orange-100 my-8 rounded-lg">
                <h2 className="font-bold">目次</h2>
                <ul>
                    {toc.map((item) => (
                        <li
                            key={item.id}
                            style={{ marginLeft: item.depth * 16 }}
                        >
                            <TextLink href={`#${item.id}`}>
                                {item.text}
                            </TextLink>
                        </li>
                    ))}
                </ul>
            </div>
            <MdWrapper>{mdx}</MdWrapper>
            <Divider />
            <TextLink href="/" icon={<GoChevronLeft />}>
                記事一覧に戻る
            </TextLink>
        </div>
    );
}
