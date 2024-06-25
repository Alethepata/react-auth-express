import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Login() {

    const { login } = useAuth();

    const initialData = {
        password:"",
        email: ""
    };

    const [formData, setFormData] = useState(initialData);

    const [loginError, setLoginError] = useState(null);

    const changeData = (key, value) => {
        setFormData(curr => ({
            ...curr,
            [key]: value
        }));
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try{
            await login(formData);
            setFormData(initialData);
        } catch (err) {
            setLoginError(err);
        }
    }

    return (
        <div className="container">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        id="name"
                        type="text"
                        value={formData.email}
                        onChange={e => changeData('email', e.target.value)}
                    />
                </div>
    
                <div className="margin">
                    <label htmlFor="lastname">Cognome</label>
                    <input
                        id="lastname"
                        type="password"
                        placeholder="Password" 
                        value={formData.password}
                        onChange={e => changeData('password', e.target.value)}
                    />
                </div>

                {loginError !== null && <div className="error">{loginError.message}</div>}
                {loginError?.errors && loginError.errors.map( (err, index) => (
                <div key={`err${index}`}>{err.msg}</div>
                ))}
    
                <button>Log in</button>
    
            </form>
       </div>
    )
}

export default Login;