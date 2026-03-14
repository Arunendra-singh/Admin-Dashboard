import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";

export const AddToCart = "Add to Cart";
export const OutOfStock = "Out of Stock";
export const AddToWishlist = "Add to wishlist";
export const RemoveFromWishlist = "Remove from wishlist";
export const defaultImg = `${CDN_URL}/${WEBSITE_GUID}/Products/Thumbnail/default.jpg`;
export const isHTML = (str) => {
    const regex = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/i;
    return regex.test(str.trim());
};
