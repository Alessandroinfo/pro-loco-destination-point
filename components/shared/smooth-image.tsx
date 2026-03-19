"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

import { withBasePath } from "@/lib/site";

type SmoothImageProps = ImageProps & {
  skeletonClassName?: string;
};

export function SmoothImage({
  className,
  skeletonClassName = "",
  onLoad,
  onLoadingComplete,
  onError,
  src,
  alt,
  unoptimized,
  ...props
}: SmoothImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isSvgAsset = typeof src === "string" && src.endsWith(".svg");
  const resolvedSrc = typeof src === "string" ? withBasePath(src) : src;

  useEffect(() => {
    setIsLoaded(isSvgAsset);
  }, [isSvgAsset, src]);

  if (isSvgAsset) {
    return (
      <Image
        {...props}
        src={resolvedSrc}
        alt={alt}
        unoptimized={unoptimized ?? true}
        onLoad={onLoad}
        onLoadingComplete={onLoadingComplete}
        onError={onError}
        className={className}
      />
    );
  }

  return (
    <>
      <div
        aria-hidden="true"
        className={`image-skeleton pointer-events-none absolute inset-0 ${isLoaded ? "opacity-0" : "opacity-100"} ${skeletonClassName}`}
      />
      <Image
        {...props}
        src={resolvedSrc}
        alt={alt}
        unoptimized={unoptimized ?? isSvgAsset}
        onLoadingComplete={(image) => {
          setIsLoaded(true);
          onLoadingComplete?.(image);
        }}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setIsLoaded(true);
          onError?.(event);
        }}
        className={`transition-opacity duration-500 ease-out ${isLoaded ? "opacity-100" : "opacity-0"} ${className ?? ""}`}
      />
    </>
  );
}
