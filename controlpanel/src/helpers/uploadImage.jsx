import { TOKENS, WEBSITE_GUID, MS_URL, LANGUAGE_GUID } from "common/utils/vars";
import axios from "axios";

export default async function uploadImage(base64String) {
    let imageurl = "";
    function base64ToFile(base64String1, filename) {
        // Split the base64 string into metadata and data
        const [header, data] = base64String1.split(",");
        console.log("header : ", header);
        // Decode the Base64 string into binary data
        const binaryString = atob(data);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);

        // Convert the binary string to a byte array
        for (let i = 0; i < binaryLen; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Create a Blob from the byte array
        const blob = new Blob([bytes], { type: "application/octet-stream" });

        // Create a File from the Blob (optional)
        const file = new File([blob], filename, { type: "application/octet-stream" });

        return file;
    }

    const filename = "screenshot.jpeg";
    const file = base64ToFile(base64String, filename);

    // Upload file to the server

    // const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const posturl = `${MS_URL.CATALOG}api/upload/uploadimageAPI?type=VSLogo&action=add&CurrentSlidePosition=1&fileName=${file.name}`;
        const token = TOKENS.SaaS_ControlPanel_Microservice_Token;
        const Languageguid = LANGUAGE_GUID;
        const Websiteguid = WEBSITE_GUID;
        const CookieDetails = window.cookiedetails;

        const response = await axios.post(
            posturl,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: token ? `Bearer ${token}` : "",
                    Languageguid,
                    Websiteguid,
                    CookieDetails
                }
            }
        );

        if (response?.data?.data?.src) {
            imageurl = response?.data?.data?.src; // Set the image URL if it exists
        }
    } catch (error) {
        console.error("Error uploading file", error);
    }

    return imageurl;
}
