import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm.js';
import useStateContext from '../hooks/useStateContext.js';
import '../css/formpage.css';

// login page

// creates blank object with form values for useForm hook
const getFreshModel = () => ({
    username: "",
    password: ""
});

function Login() {
    const {context, setContext} = useStateContext();
    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);
    const navigate = useNavigate();

    // when form submits, attempt to log in user
    // include validation check and endpoint here
    const login = (e) => {
        e.preventDefault();
        if (validate()) {
            // connect to backend if user has valid login info

            /* for now it will automatically sign in as long as a username and password is
            provided and will update the state context with the provided username. this is
            temporary until the backend has been set up and we can create endpoints */
            // set state context to the user's username
            setContext({login_id: values.username});
            // redirect to home page
            navigate('/');
            alert("Successfully logged in!");
            window.location.reload(false);
        }
    };

    // check if login fields are valid inputs
    // may change validation rules later
    const validate = () => {
        // set error messages in temp object, will display on page if there is an error
        let temp ={};
        temp.username = values.username != "" ? "" : "You must enter a username.";
        temp.password = values.password != "" ? "" : "You must enter a password.";
        setErrors(temp);
        // checks that all error messages are blank and returns true if so
        return Object.values(temp).every(x => x == "");
    };

    return (
        <div className='form-page'>
            <div className='form-box'>
                <h2>Log In</h2>
                <hr style={{border:'2px solid black'}}/>
                <div className='form-inner-box'>
                    <form name="loginForm" method="post" id="loginForm" onSubmit={login}>
                        <label>Username: </label><br />
                        <input type="text" name="username" value={values.username} onChange={handleInputChange} size="30" required/><br />
                        <p>{errors.username}</p><br />
                        <label>Password: </label><br />
                        <input type="password" name="password" value={values.password} onChange={handleInputChange} size="30" required/><br />
                        <p>{errors.password}</p><br />
                    </form>
                </div>
                <button className="submit-button" type="submit" value="Submit" form="loginForm">Sign In</button>
                <br /><br />
                <p>Don't have an account?</p>
                <Link className="other-form-button" to="/signup">Create New Account</Link>
            </div>
        </div>
    );
}

export default Login;