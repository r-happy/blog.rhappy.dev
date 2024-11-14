import fs from "fs";
import path from "path";
import grayMatter from "gray-matter"; // gray-matterをインポート

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        const filePath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, "utf8");
        
        // gray-matterでフロントマターとコンテンツを分離
        const data = grayMatter(fileContents).data;

        const date = data.date instanceof Date ? data.date.toISOString().split('T')[0] : data.date;

        return {
            id: fileName.replace(/\.mdx$/, ""),
            title: data.title || "No Title",        // タイトルがない場合のデフォルト
            date: date || "No Date",           // 日付がない場合のデフォルト
            description: data.description || "",    // 説明がない場合のデフォルト
        };
    });
}
