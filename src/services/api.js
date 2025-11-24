const BASE_URL = "https://api-tortitas-2.onrender.com/api/v1";

export const get = async (url) => {
    const res = await fetch(`${BASE_URL}${url}`);
    if (!res.ok) throw new Error(url);
    return res.json();
};

export const post = async (url, body, isFormData = false) => {
    const options = {
        method: "POST",
        body: isFormData ? body : JSON.stringify(body),
        headers: {}
    };

    if (!isFormData) {
        options.headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${BASE_URL}${url}`, options);
    if (!res.ok) throw new Error("Error POST " + url);
    return res.json();
};

export const put = async (url, body) => {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error("Error PUT " + url);
    return res.json();
};

export const del = async (url) => {
    const res = await fetch(`${BASE_URL}${url}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error DELETE " + url);
    return res.json().catch(() => true);
};
