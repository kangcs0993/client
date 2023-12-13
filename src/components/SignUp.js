import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {createUser} from "../service/user";
import {isEmail, isUsername, isPassword} from "../utils/validator";

export default function SignUp(){
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const disabled = !isEmail(email) || !isUsername(username) || !isPassword(password);

    async function handleSubmit(e){
        e.preventDefault();

        const newUser = {email, name, username, password};

        await createUser(newUser);

        alert(`hello ${name}`);

        navigate("/");
    };

    useEffect(() => {
        document.title = "register - instagram"
    }, []);

    return(
        <form
            onSubmit={handleSubmit}
            className="max-w-xs mx-auto p-4 mt-16"
        >
            <div className="mt-4 mb-4 flex justify-center">
                <img
                    src="/images/logo.png"
                    className="w-36"></img>
            </div>

            <div className="mb-2">
                <label className="block">
                    <input
                        type="text"
                        name="email"
                        className="border px-2 py-1 rounded w-full"
                        onChange={({target}) => setEmail(target.value)}
                        placeholder="email"
                    >
                    </input>
                </label>
            </div>

            <div className="mb-2">
                <label className="block">
                    <input
                        type="text"
                        name="name"
                        className="border rounded px-2 py-1 w-full"
                        onChange={({target}) => setName(target.value)}
                        placeholder="name"
                    >
                    </input>
                </label>
            </div>

            <div className="mb-2">
                <label className="block">
                    <input
                        name="username"
                        className="border px-2 py-1 rounded w-full"
                        onChange={({target}) => setUsername(target.value)}
                        placeholder="username"
                    >
                    </input>
                </label>
            </div>

            <div className="mb-2">
                <label className="block">
                    <input
                        type="password"
                        name="password"
                        className="border rounded px-2 py-1 w-full"
                        onChange={({target}) => setPassword(target.value)}
                        placeholder="password"
                        autoComplete="new-password"
                    >
                    </input>
                </label>
            </div>
            
            <button
                type="submit"
                className="bg-blue-500 rounded-lg text-sm font-semibold px-4 py-2 text-white w-full disabled:opacity-[0.5]"
                disabled={disabled}
            >
                register
            </button>
        </form>
    )

}