import {server, getBearerToken} from "./header";

export async function getProfiles(username){
    const res = await fetch(`${server}/profiles/?username=${username}`, {
        headers: {
            "Authorization": getBearerToken()
        }
    });

    if(!res.ok){
        throw new Error(res.statusText + "error");
    }

    return await res.json();
}

export async function getProfile(username){
    const res = await fetch(`${server}/profiles/${username}`, {
        headers: {
            "Authorization": getBearerToken()
        }
    });

    if(!res.ok){
        throw new Error(res.statusText + "error");
    }

    return await res.json();
}

export async function getTimeline(username){
    const res = await fetch(`${server}/posts/?username=${username}`, {
        headers: {
            "Authorization": getBearerToken()
        }
    });

    if(!res.ok){
        throw new Error(res.statusText + "error");
    }

    return await res.json();
}

export async function getFollowers(username){
    const res = await fetch(`${server}/profiles/?followers=${username}`, {
        headers: {
            "Authorization": getBearerToken()
        }
    });

    if(!res.ok){
        throw new Error(res.statusText + "error");
    }

    return await res.json();
}

export async function getFollowingUsers(username){
    const res = await fetch(`${server}/profiles/?following=${username}`, {
        headers: {
            "Authorization": getBearerToken()
        }
    });

    if(!res.ok){
        throw new Error(res.statusText + "error");
    }

    return await res.json();
}

export async function follow(username){
    const res = await fetch(`${server}/profiles/${username}/follow`, {
        method: "POST",
        headers: {
            "Authorization": getBearerToken()
        }
    });

    if(!res.ok){
        throw new Error(res.statusText + "error");
    }

    return await res.json();
}

export async function unfollow(username){
    const res = await fetch(`${server}/profiles/${username}/unfollow`, {
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