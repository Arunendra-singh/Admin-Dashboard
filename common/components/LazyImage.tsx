import { SVGImageURI } from "./../utils";

interface ILazyImageProps {
    src: string;
    alt: string;
    classes?: string;
    width: any;
    height: any;
    fill?: string;
    placeholder?: string;
    id?: string;
}

export function LazyImage({ src, alt, classes = "", id = "", width = "", height = "", fill = window.defaultLazyImgFillColor, placeholder = SVGImageURI(width, height, fill) }: ILazyImageProps): JSX.Element {
    return <img src={src} id={id} data-src={src} alt={alt} className={`${window.defaultLazyImgClass} ${classes}`} onError={(evt) => (evt.currentTarget.src = placeholder)} width={width} height={height} />;
}

export function SetLazyImageDefaults({ className = "lazy-load", fill = "#f1f1f1" }) {
    window.defaultLazyImgClass = className;
    window.defaultLazyImgFillColor = fill;
}
