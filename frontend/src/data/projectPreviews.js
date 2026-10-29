// Webpack watches this context for previews added or removed during replacement.
const previewFiles = require.context(
    "../images",
    false,
    /^\.\/(?:education|EduFlow|Travel web|grocery|expense|portfolio|event|weather site|weather|apartment|movie|music|coffee)\.(?:webp|png|jpe?g)$/i
);

export default function projectPreview(name) {
    const files = previewFiles.keys();
    const names = name === "EduFlow" ? ["education", name] : name === "weather site" ? [name, "weather"] : [name];
    const file = names.flatMap(base => ["webp", "png", "jpg", "jpeg"].map(extension => `./${base}.${extension}`))
        .map(candidate => files.find(file => file.toLowerCase() === candidate.toLowerCase()))
        .find(Boolean);
    if (!file) return null;
    const image = previewFiles(file);
    return image.default || image;
}
