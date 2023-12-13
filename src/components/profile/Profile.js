import {useState, useEffect, useContext} from "react";
import {useParams, useNavigate} from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import ProfileInfo from "./ProfileInfo";
import PostItem from "./PostItem";
import PostForm from "../PostForm";
import {getProfile, getTimeline, follow, unfollow} from "../../service/profile";
import Spinner from "../Spinner";

export default function Profile(){
    const {username} = useParams();
    const {user, setUser} = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const {modalOpen, setModalOpen} = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [username]);

    console.log(posts)

    async function fetchData(){
        try{
            setProfile(null);

            const profileData = await getProfile(username);

            const timelineData = await getTimeline(username);

            setProfile(profileData.profile);
            setPosts(timelineData.posts);
        }catch{
            navigate("/notfound", {replace: true});
        }
    }

    async function handleFollow(){

    };

    async function handleUnfollow(){

    };

    async function handleSignOut(){

    };

    useEffect(() => {
        document.title = `${username} - instagram`
    }, []);

    const timeline = posts.map(post => (
        <PostItem key={post.id}
                  id={post.id}
                  thumbnailURL={post.photoURLs[0]}
                  likesCount={post.likesCount}
                  commentCount={post.commentCount}
        >
        </PostItem>
    ));

    console.log("...")
    console.log(timeline)

    if(!profile){
        return <Spinner></Spinner>
    }

    return(
        <>
            <ProfileInfo username={profile.username}
                         name={profile.name}
                         avatarUrl={profile.avatarUrl}
                         bio={profile.bio}
                         postCount={profile.postCount}
                         followerCount={profile.followerCount}
                         followingCount={profile.followingCount}
                         isFollowing={profile.isFollowing}
                         handleSignOut={profile.handleSignOut}
                         handleFollow={profile.handleFollow}
                         handleUnfollow={profile.handleUnfollow}
                         isMaster={user.username === username}
            >
            </ProfileInfo>

            <div className="border-t my-4"></div>

            {timeline.length > 0 ? (
                <ul className="grid grid-cols-3 gap-2 mb-2">
                    {timeline}
                </ul>
            ) : (
                <p className="text-center">no posts</p>
            )}
        </>
    )
}