import { gql } from "@apollo/client";

export const useGetclearCacheByKey = gql`
    query getclearCacheByKey($key: String!) {
        clearCacheByKey(key: $key) {
            message
            statuscode
        }
    }
`;
