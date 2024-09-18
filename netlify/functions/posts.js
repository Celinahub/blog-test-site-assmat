const fs = require('fs');
const path = require('path');
const marked = require('marked');

exports.handler = async (event) => {
  try {
    // Répertoire où se trouvent les fichiers Markdown
    const postsDir = path.join(process.cwd(), '_posts');
    const files = fs.readdirSync(postsDir);

    // Lire et traiter chaque fichier Markdown
    const posts = files.map(file => {
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Séparer les métadonnées du corps du contenu
      const [metadata, body] = content.split('---').filter(Boolean);

      // Convertir les métadonnées en un objet
      const metadataLines = metadata.split('\n');
      const postData = {};
      metadataLines.forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) {
          postData[key.trim()] = value.trim();
        }
      });

      // Convertir le corps Markdown en HTML
      return {
        ...postData,
        body: marked(body.trim())
      };
    });

    // Répondre avec les articles au format JSON
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
