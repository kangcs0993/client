import {server, getBearerToken} from "./header";

export async function getComments(id){
    const res = await fetch(`${server}/posts/${id}/comments`, {
        headers: {
            "Authorization": getBearerToken()
        }
    });

    if(!res.ok){
        throw new Error(res.statusText + "error");
    }

    return await res.json();
}

export async function createComment(id, content){
    const res = await fetch(`${server}/posts/${id}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getBearerToken()
        },
        body: JSON.stringify({content})
    });

    if(!res.ok){
        throw new Error(res.statusText + "error");
    }

    return await res.json();
}

export async function deleteComment(id){
    const res = await fetch(`${server}/posts/comments/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": getBearerToken()
        }
    });

    if(!res.ok){
        throw new Error(res.statusText + "error");
    }

    return await res.json();
}