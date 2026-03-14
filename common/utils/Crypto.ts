export const Encode = async (message: string, algorithm: "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512" = "SHA-512"): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest(algorithm, data); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const encodedHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return encodedHex;
};

export default {
    Encode
};
