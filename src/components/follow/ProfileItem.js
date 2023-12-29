import {useContext} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../auth/AuthContext";

export default function ProfileItem({
    username,
    name,
    avatarUrl,
    isFollowing,
    handleFollow,
    handleUnfollow
}){
    const {user} = useContext(AuthContext);
    const isMaster = username === user.username;

    const followButton = (
        <button className="bg-blue-500 text-white text-sm px-4 py-2 font-semibold p-2 rounded-lg"
                onClick={() => handleFollow(username)}
        >
            follow
        </button>
    )

    const unfollowButton = (
        <button className="bg-gray-200 text-sm px-4 py-2 font-semibold p-2 rounded-lg"
                onClick={() => handleUnfollow(username)}
        >
            following
        </button>
    )

    return(
        <li className="flex justify-between items-center mb-2">
            <Link className="inline-flex items-center"
                  to={`/profiles/${username}`}
            >
                <img className="w-12 h-12 object-cover rounded-full border"
                     src={avatarUrl}
                >
                </img>

                <div className="ml-2">
                    <h3 className="block font-semibold">
                        {username}
                    </h3>

                    <span className="block text-gray-400 text-sm">
                        {name}
                    </span>
                </div>
            </Link>

            {!isMaster && (
                isFollowing ? unfollowButton : followButton
            )}
        </li>
    )
}