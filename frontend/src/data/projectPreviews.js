// Webpack watches this context for previews added or removed during replacement.
const previewFiles = require.context(
    "../images",
    false,
    /^\.\/(?:education|EduFlow|Travel web|grocery|expense|portfolio|event|weather site|weather|apartment|movie|music|coffee)\.webp$/i
);

export default function projectPreview(name) {
    const files = previewFiles.keys();
    const names = name === "EduFlow" ? ["education", name] : name === "weather site" ? [name, "weather"] : [name];
    const file = names.map(base => `./${base}.webp`)
        .map(candidate => files.find(file => file.toLowerCase() === candidate.toLowerCase()))
        .find(Boolean);
    if (!file) return null;
    const image = previewFiles(file);
    return image.default || image;
}
