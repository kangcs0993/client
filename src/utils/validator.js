export function isEmail(email){
    const pattern = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;

    if(email.match(pattern)){
        return true;
    }

    return false;
}

export function isUsername(username){
    const pattern = /^[a-zA-Z0-9]{5,}$/;

    if(username.match(pattern)){
        return true;
    }

    return false;
}

export function isPassword(password){
    if(password.trim().length >= 5){
        return true;
    }

    return false;
}