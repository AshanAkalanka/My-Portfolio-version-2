import { useLayoutEffect, useRef, useState } from "react";

function ProgressiveImage({
    src,
    alt,
    className = "",
    wrapperClassName = "",
    loading = "lazy",
    onLoad,
    onError,
    ...imageProps
}) {
    const imageRef = useRef(null);
    const [settledSrc, setSettledSrc] = useState(null);
    const isLoaded = settledSrc === src;

    useLayoutEffect(() => {
        if (imageRef.current?.complete && imageRef.current.naturalWidth > 0) {
            setSettledSrc(src);
        }
    }, [src]);

    return (
        <div className={`progressive-image ${wrapperClassName}`}>
            <div
                aria-hidden="true"
                className={`progressive-image-placeholder ${isLoaded ? "is-loaded" : ""}`}
            >
                <span />
            </div>
            <img
                ref={imageRef}
                {...imageProps}
                src={src}
                alt={alt}
                loading={loading}
                decoding="async"
                onLoad={(event) => {
                    setSettledSrc(src);
                    onLoad?.(event);
                }}
                onError={(event) => {
                    setSettledSrc(src);
                    onError?.(event);
                }}
                className={`${className} transition-[opacity,transform] duration-500 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                }`}
            />
        </div>
    );
}

export default ProgressiveImage;
