import Link from "next/link";
import { getAllPosts } from "@/lib/getAllPosts";

export default function ArticlesList() {
    const posts = getAllPosts();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">記事一覧</h1>
            <ul className="mt-4 space-y-4">
                {posts.map((post) => (
                    <li key={post.id} className="bg-orange-100 p-4 rounded-lg">
                        <Link href={`/${post.id}`}>
                            <h2 className="text-xl font-semibold">
                                {post.title}
                            </h2>
                            <p className="text-sm text-gray-600">{post.date}</p>
                            <p className="mt-2">{post.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
