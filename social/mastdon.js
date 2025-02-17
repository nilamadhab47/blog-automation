const Mastodon = require("mastodon-api");

const M = new Mastodon({
    access_token: "YOUR_MASTODON_ACCESS_TOKEN",
    api_url: "https://mastodon.social/api/v1/"
});

async function postToMastodon(title, url) {
    await M.post("statuses", { status: `🚀 New blog post: "${title}"\nRead here: ${url}` });
    console.log("✅ Blog shared on Mastodon!");
}

postToMastodon("Best AI Tools for Backend Developers", "https://blog.penpixels.xyz/ai-tools-backend");
