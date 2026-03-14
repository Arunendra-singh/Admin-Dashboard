import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { REACT_APP_API_ENDPOINT, LANGUAGE_GUID, WEBSITE_GUID, TOKENS, LANGUAGE_GUID_DEFAULT } from "common/utils/vars";

const httpLink = createHttpLink({
    uri: `${REACT_APP_API_ENDPOINT}graphql/`
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = TOKENS.SaaS_ControlPanel_Microservice_Token;
    const storedLanguage = localStorage.getItem("languageguid");
    // const token = localStorage.getItem("token");
    const Languageguid = storedLanguage || LANGUAGE_GUID;
    const Websiteguid = WEBSITE_GUID;
    const defaultlanguageGuid = storedLanguage || LANGUAGE_GUID_DEFAULT;
    const CookieDetails = window.cookiedetails;

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
            // authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTYWFTX0NhdGFsb2dfTWljcm9zZXJ2aWNlIiwianRpIjoiZDEwOTNlNjItNTJmOS00MDdkLWFkYjEtOTUyMjMwZWNiYWUwIiwiaWF0IjoxNzE5MjExNjM4LCJuYmYiOjE3MTkyMTE2MzgsImV4cCI6MTcxOTI5ODAzOCwiaXNzIjoiRGVtb0lzc3VlciIsImF1ZCI6IkRlbW9BdWRpZW5jZSJ9.xVXmhUeOgRivpm88A9afBiRZHldDggWYFrYOk5gMqXY",
            Languageguid,
            Websiteguid,
            CookieDetails,
            defaultlanguageGuid
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        addTypename: false
    })
});

export default client;
