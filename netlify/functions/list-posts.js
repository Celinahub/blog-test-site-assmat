const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    try {
        // Définir le chemin vers le dossier _posts
        const postsDirectory = path.join(__dirname, '../../_posts');

        // Lire les fichiers dans le dossier _posts
        const files = fs.readdirSync(postsDirectory);

        // Filtrer pour ne garder que les fichiers avec l'extension .md
        const markdownFiles = files.filter(file => file.endsWith('.md'));

        return {
            statusCode: 200,
            body: JSON.stringify(markdownFiles), // Retourner la liste des fichiers Markdown
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not list posts' }),
        };
    }
};
