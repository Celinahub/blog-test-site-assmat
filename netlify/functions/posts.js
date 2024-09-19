const fs = require('fs');
const path = require('path');
const marked = require('marked');

exports.handler = async (event) => {
  const postsDir = path.join(process.cwd(), '_posts'); // Utilise process.cwd() pour accéder au répertoire racine du projet

  try {
    const files = fs.readdirSync(postsDir);
    const posts = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
        return {
          filename: file,
          content: marked(content),
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
