import {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {getProfiles} from "../service/profile";
import Spinner from "./Spinner";

export default function Explore(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [profiles, setProfiles] = useState([]);

    console.log(profiles);

    async function search(username){
        try{
            // if(!username){
            //     return setProfiles([]);
            // }

            setError(null);
            setIsLoaded(false);

            const {profiles} = await getProfiles(username);

            setProfiles(profiles);
        }catch(error){
            alert(error);
        }finally{
            setIsLoaded(true);
        }
    }

    const profileList = profiles.map((profile) => {
        return(
            <li className="flex items-center justify-between my-2"
                key={profile.id}
            >
                <Link className="flex items-center"
                      to={`/profiles/${profile.username}`}
                >
                    <img className="w-10 h-10 object-cover rounded-full"
                         src={profile.avatarUrl}
                    >
                    </img>

                    <div className="ml-2">
                        <h3 className="block font-semibold">
                            {profile.username}
                        </h3>

                        <span className="block text-gray-400 text-sm">
                            {profile.name}
                        </span>
                    </div>
                </Link>

                {profile.isFollowing && (
                    <div className="ml-2 text-sm text-blue-500 font-semibold">
                        following
                    </div>
                )}
            </li>
        )
    })

    return(
        <div className="px-4">
            <h3 className="text-lg font-semibold my-4">
                search
            </h3>

            <div className="mb-4">
                <input className="border px-2 py-1 rounded w-full outline-none"
                       type="text"
                       onChange={({target}) => search(target.value)}
                       placeholder="id"
                >
                </input>
            </div>

            {isLoaded ? (
                <ul>
                    {profileList}
                </ul>
            ):(
                <Spinner></Spinner>
            )}

            {error && (
                <p className="text-red-500">
                    {error.message}
                </p>
            )}
        </div>
    )
}