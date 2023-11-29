export const server = "http://localhost:3000/api";

export function getBearerToken(){
    const user = JSON.parse(localStorage.getItem("user"));

    return "Bearer " + user.access_token;
}