export interface ICollection {
    alias: string;
    bannertext: string;
    canonicallink?: string;
    categorybanner?: string;
    categoryimageurl: string;
    categoryurl: string;
    collectionbannerimagename: string;
    collectionguid: string;
    collectionname: string;
    collectiontype: string;
    descriptiontext: string;
    furtherdescriptiontext: string;
    h1tag?: string;
    metadescription?: string;
    metakeywords?: string;
    metarobots?: string;
    metatitle?: string;
    offerbannerimagename?: string;
    parentcollectionguid: any;
    productcount: number;
    subcategories?: ICollection[];
}
