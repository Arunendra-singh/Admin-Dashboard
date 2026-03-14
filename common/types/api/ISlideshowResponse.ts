export interface IGetSlideShowDataResponse {
    statuscode: number;
    message: string;
    data: IGetSlideShowDataData;
}

export interface IGetSlideShowDataData {
    resources: Resources;
    slideshowdetails: Slideshowdetails;
}

export interface Resources {
    slideshowname: string;
    slideshowtypeslideshowtype: string;
    active: string;
    slidedelaytime: string;
    slideeffecttime: string;
    height: string;
    overlayfontsize: string;
    overlayforecolor: string;
    overlaybgcolor: string;
    overlayposition: string;
    errorfontsize: string;
    erroroverlayheight: string;
    heisoverlaytextight: string;
    showpagination: string;
}

export interface Slideshowdetails {
    slideshowguid: string;
    slideshowname: string;
    slideshowtypeguid: string;
    slidedelaytime: number;
    slideeffecttime: number;
    showpagination: boolean;
    isoverlaytext: boolean;
    height: number;
    items: number;
    margin: number;
    loop: boolean;
    center: boolean;
    stagepadding: number;
    nav: boolean;
    rewind: boolean;
    dots: boolean;
    lazyload: boolean;
    autoplay: boolean;
    autoplaytimeout: number;
    autoplayhoverpause: boolean;
    autowidth: boolean;
    slideshowimages: Slideshowimage[];
}

export interface Slideshowimage {
    slideshowimageguid: string;
    imagename: string;
    navigateurl: string;
    displayorder: number;
    isnewwindow: boolean;
    alttext: string;
    overlaytext: string;
    imageurl: string;
}
