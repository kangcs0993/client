import {BorwserRouter as Router, Routes, Route} from "react-router-dom";
import AuthProvider from "./components/auth/AuthProvider";
import AuthRequired from "./components/auth/AuthRequired";
import Layout from "./components/Layout";
import Feed from "./components/Feed";
import PostView from "./components/PostView";
import Comments from "./components/comments/Comments";
import Explore from "./components/Explore";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/profile/Profile";
import Followers from "./components/follow/Followers";
import Following from "./components/follow/Following";
import ProfileEdit from "./components/ProfileEdit";
import NotFound from "./components/NotFound";

export default function App(){
	return(
		<Router>
			<AuthProvider>
				<Routes>
					<Route path="/"
						   element={
							<AuthRequired>
								<Layout></Layout>
							</AuthRequired>
						   }>
						<Route index element={<Feed></Feed>}></Route>
						<Route path="explore" element={<Explore></Explore>}></Route>
						<Route path="p/:id">
							<Route index element={<PostView}></Route>
							<Route path="comments" element={<Comments></Comments>}></Route>
						</Route>
						<Route path="profiles/:username">
							<Route index element={<Profile></Profile>}></Route>
							<Route path="followers" element={<Followers></Followers>}></Route>
							<Route path="following" element={<Following></Following>}></Route>
						</Route>
						<Route path="accounts/edit" element={<ProfileEdit></ProfileEdit>}></Route>
					</Route>

					<Route path="account/login" element={<Login></Login>}></Route>
					<Route path="account/signup" element={<SignUp></SignUp>}></Route>
					<Route path="*" element={<NotFound></NotFound>}></Route>
				</Routes>
			</AuthProvider>
		</Router>
	)
}