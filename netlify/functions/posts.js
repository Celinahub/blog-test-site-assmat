// netlify/functions/posts.js

const fs = require('fs');
const path = require('path');
const marked = require('marked');

exports.handler = async (event) => {
  try {
    const postsDir = path.join(process.cwd(), '_posts');
    const files = fs.readdirSync(postsDir);

    const posts = files.map(file => {
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      const [metadata, body] = content.split('---').filter(Boolean);
      const metadataLines = metadata.split('\n');
      const postData = {};
      metadataLines.forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) {
          postData[key.trim()] = value.trim();
        }
      });

      return {
        ...postData,
        body: marked(body.trim())
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(posts),
    };
  } catch (error) {
    console.error('Error reading posts:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error reading posts' }),
    };
  }
};
