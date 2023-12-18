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
    const [modalOpen, setModalOpen] = useState(false);
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

    const modal = (
        <div className="fixed inset-0 bg-black/[0.2] z-10"
             onClick={(e) => {
                if(e.target === e.currentTarget){
                    setModalOpen(false);
                }
             }}
        >
            <PostForm></PostForm>
        </div>
    )



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

            <svg className="opacity-40 w-12 fixed right-8 bottom-8 hover:opacity-80 cursor-pointer z-10"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512"
                 onClick={() => setModalOpen(true)}
            >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
            </svg>

            {modalOpen && modal}
        </>
    )
}