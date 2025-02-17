const GhostAdminAPI = require("@tryghost/admin-api");
const fs = require("fs");

const api = new GhostAdminAPI({
    url: "https://blog.penpixels.xyz",
    key: "YOUR_ADMIN_API_KEY",
    version: "v5.0"
});

async function publishPost(fileName) {
    const content = fs.readFileSync(fileName, "utf-8");
    const title = fileName.replace("blog-", "").replace(".md", "").replace(/-/g, " ");

    try {
        const post = await api.posts.add({
            title: title,
            html: `<p>${content.replace(/\n/g, "</p><p>")}</p>`,
            status: "published"
        });
        console.log(`✅ Post published: ${post.url}`);
    } catch (err) {
        console.error("❌ Error publishing post:", err);
    }
}

// Example usage
publishPost("blog-ai-tools-for-backend-developers.md");
