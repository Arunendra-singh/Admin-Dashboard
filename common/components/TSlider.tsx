/**
 * Author: Rohan Gaikwad
 * Date: 2023-03-01
 * Pending: vertical carousel, desktop drag
 */
import { useEffect, useRef, useState, Fragment } from "react";

interface ISliderOptions {
    items: number;
    slideBy: number;
    margin: number;
    speed: number;
    ease: string;
    direction: string;
}
type IResponsiveOptions = Record<number, ISliderOptions>;

interface ISliderMethods {
    prev: () => void;
    next: () => void;
    slideTo: (slideIndex: number) => void;
}

const _defaults = {
    items: 1,
    margin: 0,
    slideBy: 1,
    speed: 0.3,
    ease: "ease-out",
    direction: "horizontal"
};

const processOptions = (options: ISliderOptions) => {
    return Object.assign({}, _defaults, options);
};

const processResponsiveOptions = (options: ISliderOptions, responsive: IResponsiveOptions | undefined) => {
    const _defOptions = Object.assign({}, _defaults, options);

    const rOptions = responsive ?? {};
    if (rOptions["0"] === undefined) {
        rOptions["0"] = _defOptions;
    }

    Object.keys(rOptions).forEach((k, i) => {
        const key = Number(k);
        rOptions[key] = Object.assign({}, _defOptions, rOptions[key]);
    });
    // console.log(rOptions);
    return rOptions;
};

type TSliderParams = {
    children: JSX.Element[];
    options?: ISliderOptions;
    lazy?: boolean;
    responsive?: IResponsiveOptions;
    dots?: boolean;
    onInit?: (methods: ISliderMethods) => void;
    onSlide?: (activeSlide: number) => void;
    id?: string;
    autoplay?: boolean;
    autoplayTimeout?: number;
    Dot?: React.ComponentType<any>;
    PrevContent?: React.ComponentType<any>;
    NextContent?: React.ComponentType<any>;
};

const DotComp: React.ComponentType<any> = ({ children, ...rest }) => (
    <button aria-label="Dot" type="button" {...rest}>
        {children ?? ""}
    </button>
);

const PrevComp: React.ComponentType<any> = () => <>Prev</>;
const NextComp: React.ComponentType<any> = () => <>Next</>;

const TSlider: React.FC<TSliderParams> = ({ children, options = _defaults, lazy = false, responsive, dots = false, autoplay = false, autoplayTimeout = 3000, onSlide = () => {}, onInit = () => {}, id = `TSlider_${new Date().getTime()}`, Dot = DotComp, PrevContent = PrevComp, NextContent = NextComp }): JSX.Element => {
    const instanceRef = useRef<ISliderMethods | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<number>(0);
    const autoplayRef = useRef(0);
    const settingsRef = useRef<ISliderOptions>(processOptions(options));
    const responsiveRef = useRef(processResponsiveOptions(options, responsive));
    const [settings, setSettings] = useState(responsive !== undefined ? responsiveRef.current["0"] : settingsRef.current);
    const pos = useRef({ x: 0, y: 0 });
    const tsPos = useRef({ x: 0, y: 0 });
    const prevElemRef = useRef<HTMLButtonElement>(null);
    const nextElemRef = useRef<HTMLButtonElement>(null);

    const ApplySettingsIfMatches = (e: MediaQueryList | MediaQueryListEvent, key: number): void => {
        if (e.matches) {
            if (responsive !== undefined) {
                const _settings = responsiveRef.current[key];
                setSettings(_settings);
                Slide();

                if (_settings.slideBy > _settings.items) {
                    // eslint-disable-next-line no-console
                    console.warn("Warning: slideBy has been set to be greater than items. This may cause certain slides to be skipped.");
                }
            }
        }
    };

    useEffect(() => {
        instanceRef.current = {
            prev: PrevHandler,
            next: NextHandler,
            slideTo: SlideTo
        };

        onInit(instanceRef.current);

        ToggleActiveClass();

        if (autoplay) {
            setTimeout(() => {
                Autoplay();
            }, autoplayTimeout / 2);
        }

        if (lazy) LazyLoadImage();
        if (responsive !== undefined) {
            const keys = Object.keys(responsive).sort();

            for (let i = 0; i < keys.length; i++) {
                const key = Number(keys[i]);
                let query = `(min-width: ${keys[i]}px)`;
                if (i + 1 < keys.length) {
                    query += ` and (max-width: ${Number(keys[i + 1]) - 1}px)`;
                }
                // console.log(query);

                const mql = window.matchMedia(query);
                ApplySettingsIfMatches(mql, key);

                mql.addEventListener("change", (evt) => {
                    ApplySettingsIfMatches(evt, key);
                });
            }
        }
    }, [children]);

    const Autoplay = (): void => {
        autoplayRef.current = window.setTimeout(() => {
            let cur = activeRef.current;
            cur += settings.slideBy;
            if (activeRef.current === children.length - settings.items) {
                cur = 0;
            }
            if (cur > children.length - settings.items) {
                cur = children.length - settings.items;
            }
            // console.log(id, cur);
            SlideTo(cur);
            Autoplay();
        }, autoplayTimeout);
    };

    const PrevHandler = (): void => {
        clearTimeout(autoplayRef.current);
        if (activeRef.current > 0) {
            activeRef.current -= settings.slideBy;
            activeRef.current = Math.max(0, activeRef.current);
            Slide();
        }
    };

    const NextHandler = (): void => {
        clearTimeout(autoplayRef.current);
        const max = children.length - settings.items;
        if (activeRef.current < max && settings.slideBy !== undefined) {
            activeRef.current += settings.slideBy;
            activeRef.current = Math.min(max, activeRef.current);
            Slide();
        }
    };

    const LazyLoadImage = (): void => {
        if (slidesRef.current !== null) {
            const images: NodeListOf<HTMLImageElement> = slidesRef.current.children[activeRef.current].querySelectorAll(":scope img.lazy");
            // console.log(images);
            images.forEach((img, i) => {
                const { src: datasrc } = img.dataset;
                const { src } = img;

                img.classList.remove("lazy");
                img.classList.add("lazy-loaded");

                if (src === "" || datasrc !== src) {
                    if (datasrc !== undefined) {
                        img.src = datasrc;
                    }
                }
            });
        }
    };

    const Slide = (): void => {
        ToggleActiveClass();

        if (containerRef.current !== null && slidesRef.current !== null) {
            if (lazy) LazyLoadImage();
            const w = containerRef.current.clientWidth;
            const iw = w / settings.items - settings.margin / (settings.items / (settings.items - 1));
            const x = activeRef.current * (iw + settings.margin);
            pos.current.x = x * -1;
            slidesRef.current.style.transform = `translateX(${x * -1}px)`;
        }

        onSlide(activeRef.current);
    };

    const ToggleActiveClass = (): void => {
        document.querySelectorAll(`#${id} .dots .active`).forEach((elem) => {
            elem.classList.remove("active");
        });
        document.querySelector(`#${id} .dots`)?.children[activeRef.current].classList.add("active");

        document.querySelectorAll(`#${id} .slides .slide.active`).forEach((elem) => {
            elem.classList.remove("active");
        });
        document.querySelector(`#${id} .slides`)?.children[activeRef.current].classList.add("active");

        if (prevElemRef.current !== null) prevElemRef.current.disabled = activeRef.current === 0;
        if (nextElemRef.current !== null) nextElemRef.current.disabled = activeRef.current >= children.length - settings.items;
    };

    const SlideTo = (slideIndex: number): void => {
        activeRef.current = slideIndex;
        Slide();
    };

    const TouchStartHandler = (evt: React.TouchEvent) => {
        const { pageX, pageY } = evt.nativeEvent.touches[0];
        tsPos.current = { x: pageX, y: pageY };

        if (slidesRef.current !== null) {
            slidesRef.current.style.transition = "0s";
        }
    };

    const TouchEndHandler = (evt: React.TouchEvent) => {
        const { pageX } = evt.nativeEvent.changedTouches[0];
        const { x } = tsPos.current;
        evt.preventDefault();

        if (slidesRef.current !== null && containerRef.current !== null) {
            slidesRef.current.style.transition = `${settings.speed}s ${settings.ease}`;

            const diffX = pageX - x;
            const containerWidth = containerRef.current.clientWidth;
            // const diffY = pageY - y;
            // console.log(diffX, containerWidth);
            if (containerWidth / Math.abs(diffX) > 0.5) {
                activeRef.current += diffX > 0 ? -1 : 1;
                activeRef.current = Math.max(0, activeRef.current);
                activeRef.current = Math.min(activeRef.current, children.length - settings.items);
                Slide();
            } else {
                slidesRef.current.style.transform = `translateX(${pos.current.x}px)`;
            }
        }
    };

    const TouchMoveHandler = (evt: React.TouchEvent) => {
        const { pageX } = evt.nativeEvent.touches[0];
        // console.log(`x: ${pageX}, y: ${pageY}`);

        const moveX = pos.current.x - (tsPos.current.x - pageX);
        // const moveY = tsPos.current.y - pageY;

        if (slidesRef.current !== null) {
            slidesRef.current.style.transform = `translateX(${moveX}px)`;
        }
    };

    return (
        <div className="t-slider" ref={containerRef} id={id}>
            <div className="slides-container" style={{ overflow: "hidden" }} onTouchStart={TouchStartHandler} onTouchEnd={TouchEndHandler} onTouchMove={TouchMoveHandler}>
                <div className="slides" ref={slidesRef} style={{ display: "grid", gridTemplateColumns: `repeat(${children.length}, calc(${100 / settings.items}% - ${settings.margin / (settings.items / (settings.items - 1))}px)`, gap: `${settings.margin}px`, transition: `${settings.speed}s ${settings.ease}` }}>
                    {children.map((slide, i) => (
                        <div key={`${id}_slide${i}`} className="slide">
                            {slide}
                        </div>
                    ))}
                </div>
            </div>
            <div className="controls">
                <div className="nav">
                    <button aria-label="Previous" ref={prevElemRef} className="prev" onClick={PrevHandler}>
                        <PrevContent />
                    </button>
                    <button aria-label="Next" ref={nextElemRef} className="next" onClick={NextHandler}>
                        <NextContent />
                    </button>
                </div>
                {dots && (
                    <div className="dots">
                        {children.map((c, i) => (
                            <Fragment key={`${id}_dot_${i}`}>
                                <Dot
                                    onClick={() => {
                                        SlideTo(i);
                                    }}
                                >
                                    {i + 1}
                                </Dot>
                            </Fragment>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TSlider;
