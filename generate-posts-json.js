const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
const posts = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));

fs.writeFileSync(path.join(__dirname, 'posts.json'), JSON.stringify(posts, null, 2));
