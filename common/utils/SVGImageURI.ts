export const SVGImageURI = (width: number = 256, height: number = 256, fill: string = "#cccccc"): string => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='${encodeURIComponent(fill)}'/%3E%3C/svg%3E`;
};
