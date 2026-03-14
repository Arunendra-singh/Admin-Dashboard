import { INITIAL_COOKIE_DETAILS, SET_COOKIE_DETAILS, WEBSITE_URL } from "../../../utils/vars";

export const useLogout = () => {
    const details = JSON.parse(INITIAL_COOKIE_DETAILS);
    const xhr = new XMLHttpRequest();
    const url = `${WEBSITE_URL}logout`;
    const method = "GET";
    const isAsync = true;
    xhr.open(method, url, isAsync);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(details));

    SET_COOKIE_DETAILS(details);

    setTimeout(() => {
        window.location.href = `${window.location.origin}/Login/Index`;
    }, 1000);
};
