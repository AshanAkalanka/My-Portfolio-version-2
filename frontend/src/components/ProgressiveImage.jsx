import { useState } from "react";

function ProgressiveImage({
    src,
    alt,
    className = "",
    wrapperClassName = "",
    loading = "lazy",
    ...imageProps
}) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`progressive-image ${wrapperClassName}`}>
            <div
                aria-hidden="true"
                className={`progressive-image-placeholder ${isLoaded ? "is-loaded" : ""}`}
            >
                <span />
            </div>
            <img
                {...imageProps}
                src={src}
                alt={alt}
                loading={loading}
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                onError={() => setIsLoaded(true)}
                className={`${className} transition-[opacity,transform] duration-500 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                }`}
            />
        </div>
    );
}

export default ProgressiveImage;
