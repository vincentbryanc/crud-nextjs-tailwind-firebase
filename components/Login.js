import { signInWithPopup } from "@firebase/auth"
import { auth, provider } from "../firebase"

const Login = ({ type, color }) => {
	const loginWithGoogle = () => {
		signInWithPopup(auth, provider)
	}
	return (
		<div className="h-screen">
			<button className="btn-primary" onClick={loginWithGoogle}>
				Sign in with Google
			</button>
		</div>
	)
}

export default Login
