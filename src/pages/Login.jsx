import { useAuth } from "../contexts/AuthContext";

function Login() {

    const { login } = useAuth();

    const handleSubmit = (event) => { 
        event.preventDefault();
        login();
    }
    return (
        <div className="container">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name"/>
                </div>

                <div className="margin">
                    <label htmlFor="lastname">Cognome</label>
                    <input type="text" id="lastname"/>
                </div>

                <button>Log in</button>

            </form>
        </div>
    )
}

export default Login;