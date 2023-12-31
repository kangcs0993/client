import {server, getBearerToken} from "./header";

export async function createUser(newUser){
    const res = await fetch(`${server}/users`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newUser)
    });

    if(!res.ok){
        throw new Error(res.statusText + "error");
    }

    return await res.json();
}

export async function signIn(email, password){
    const res = await fetch(`${server}/users/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });

    if(!res.ok){
        throw new Error(res.statusText + "error");
    }

    return await res.json();
}

export async function updateProfile(editedProfile){
    const res = await fetch(`${server}/users/user`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getBearerToken()
        },
        body: JSON.stringify(editedProfile)
    });

    if(!res.ok){
        throw new Error(res.statusText + "error");
    }

    return await res.json();
}

export async function updateAvatar(formData){
    const res = await fetch(`${server}/users/user`, {
        method: "PUT",
        headers: {
            "Authorization": getBearerToken()
        },
        body: formData
    });

    if(!res.ok){
        throw new Error(res.statusText + "error");
    }

    return await res.json();
}