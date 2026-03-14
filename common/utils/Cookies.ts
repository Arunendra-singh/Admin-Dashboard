export const SetCookie = (name: string, value: string, days: number): void => {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const GetCookie = (name: string): string => {
    if (CheckCookie(name)) {
        return document.cookie
            .split(";")
            .map((c) => c.trim())
            .filter((c) => c.includes(`${name}=`))[0]
            .split("=")[1];
    } else {
        return "";
    }
};

export const CheckCookie = (name: string): boolean => {
    return document.cookie
        .split(";")
        .map((c) => c.trim())
        .some((c) => c.includes(`${name}=`));
};

export const RemoveCookie = (name: string) => {
    const d = new Date();
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=; Path=/;" + expires + ";";
};
