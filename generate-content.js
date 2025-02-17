const { execSync } = require('child_process');
const fs = require('fs');

function generateBlog(topic) {
    console.log(`📝 Generating blog for: ${topic}`);
    const command = `ollama run mistral "Write an SEO-optimized 1000-word blog post on '${topic}'"`;
    const content = execSync(command).toString();
    
    const fileName = `blog-${topic.replace(/\s+/g, '-').toLowerCase()}.md`;
    fs.writeFileSync(fileName, content);
    console.log(`✅ Blog saved: ${fileName}`);
}

// Example usage: Generate a blog from a random keyword
const keywords = JSON.parse(fs.readFileSync("keywords.json"));
const randomTopic = keywords[Math.floor(Math.random() * keywords.length)].keywords[0];
generateBlog(randomTopic);
