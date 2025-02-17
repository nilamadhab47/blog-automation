const puppeteer = require("puppeteer");

async function postToLinkedIn(title, url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.linkedin.com/login");
    await page.type("#username", "YOUR_EMAIL");
    await page.type("#password", "YOUR_PASSWORD");
    await page.click("[type=submit]");
    await page.waitForNavigation();

    await page.goto("https://www.linkedin.com/feed/");
    await page.click("[aria-label='Start a post']");
    await page.waitForSelector("[role='textbox']");
    await page.type("[role='textbox']", `🚀 New blog post: "${title}"\nRead here: ${url}`);
    await page.click("[aria-label='Post']");
    
    console.log("✅ Blog shared on LinkedIn!");
    await browser.close();
}

postToLinkedIn("Best AI Tools for Backend Developers", "https://blog.penpixels.xyz/ai-tools-backend");
