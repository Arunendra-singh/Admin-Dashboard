export const MILazyLoad = (targetClass: string = "lazy-load", loadedClass: string = "lazy-loaded"): void => {
    const captureClass = "lazy-capture";
    const ObserveImages = (images: HTMLImageElement[]): void => {
        if (images.length === 0) return;
        // console.log(images);
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const target = entry.target as HTMLImageElement;
                const { isIntersecting } = entry;
                // console.log(isIntersecting, target.src);

                const { src: datasrc } = target.dataset;

                if (isIntersecting && target.hasAttribute("data-src") && datasrc !== undefined && target.src !== datasrc) {
                    // console.log("MIL LOADING", target);
                    target.src = datasrc;
                    target.classList.add(loadedClass);
                    imageObserver.unobserve(target);
                }
            });
        });

        images.forEach((img) => {
            img.classList.remove(targetClass, captureClass);
            imageObserver.observe(img);
        });
    };

    const FilteredElems = (target: Document | HTMLElement): HTMLImageElement[] => {
        const elems: NodeListOf<HTMLImageElement> = target.querySelectorAll(`img.${targetClass}:not(.${captureClass}):not(.${loadedClass})`);
        elems.forEach((elem: HTMLImageElement) => {
            elem.classList.add(captureClass);
        });
        return Array.from(elems);
    };
    const initialElems = FilteredElems(document);
    ObserveImages(initialElems);

    const observer = new MutationObserver((mutations) => {
        const elems: HTMLImageElement[] = [];
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType !== 1) return;
                const mutatedElems = FilteredElems(node as HTMLElement);
                elems.push(...mutatedElems);
            });
        });
        ObserveImages(elems);
    });
    observer.observe(document.body, { childList: true, subtree: true });
};
