import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm.js';
import useStateContext from '../hooks/useStateContext.js';
import '../css/formpage.css';

// the users profile page
// let them view and change their info
// set up function when it submits
const getFreshModel = () => ({
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: ""
});

// make sure to add a normal view that displays the profile info
/* suggestion for choosing to display the the form to edit profile info:
    -maybe create useState hook of boolean value that determines whether to show the change profile form or not
    -an edit profile button switches the state to true, submitting the form sets it to false
    -have 2 different components for the normal page and the form, switch which one to display depending on the state
    -you can pass all the user information to each component by passing it as an object to the components props
*/

/* for the backend calls:
-have the GET call that retreives the users info when they load the page in a useEffect hook
    -include the username as a parameter in the GET request ex: endpointConnection(ENDPOINTS.quoteHistory+"/"+username)
    -you can get the username from the useStateContext hook
-have the POST call that submits the form to change the user's info in the function that the form calls
*/

function Profile() {
    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);
    const {context, setContext} = useStateContext();
    const doSomething = () => {};
    
    return (
        <div className='form-page'>
            <div className='form-box'>
                <h2>Profile</h2>
                <hr style={{border:'2px solid black'}}/>
                <div className='form-inner-box'>
                    <form name="profileForm" method="post" id="profileForm" onSubmit={doSomething}>
                        <label>Full Name: </label><br />
                        <input type="text" name="fullName" id="fullName" value={values.username} onChange={handleInputChange} size="50" required/><br />
                        <p>{errors.username}</p><br />
                        <label>Address 1: </label><br />
                        <input type="text" name="address1" id="address1" value={values.address1} onChange={handleInputChange} size="50" required/><br />
                        <p>{errors.address}</p><br />
                        <label>Address 2: </label><br />
                        <input type="text" name="address2" id="address2" value={values.address2} onChange={handleInputChange} size="50"/><br />
                        <p>{errors.address}</p><br />
                        <label>City: </label><br />
                        <input type="text" name="city" id="city" value={values.city} onChange={handleInputChange} size="50" required/><br />
                        <p>{errors.city}</p><br />
                        <label>State :  </label><br />
                        <select id="state" name = "state" value={values.state} onChange={handleInputChange} required>
                            <option value = "" disabled> Select State </option>
                            <option value = "AL" > Alabama </option>
                            <option value = "AK" > Alaska </option>
                            <option value = "AZ" > Arizona </option>
                            <option value = "AR" > Arkansas </option>
                            <option value = "CA" > California </option>
                            <option value = "CO" > Colorado </option>
                            <option value = "CT" > Connecticut </option>
                            <option value = "DE" > Delaware </option>
                            <option value = "FL" > Florida </option>
                            <option value = "GA" > Georgia </option>
                            <option value = "HI" > Hawaii </option>
                            <option value = "ID" > Idaho </option>
                            <option value = "IL" > Illinois </option>
                            <option value = "IN" > Indiana </option>
                            <option value = "IA" > Iowa </option>
                            <option value = "KS" > Kansas </option>
                            <option value = "KY" > Kentucky </option>
                            <option value = "LA" > Louisiana </option>
                            <option value = "ME" > Maine </option>
                            <option value = "MD" > Maryland </option>
                            <option value = "MA" > Massachusetts </option>
                            <option value = "MI" > Michigan </option>
                            <option value = "MN" > Minnesota </option>
                            <option value = "MS" > Mississippi </option>
                            <option value = "MO" > Missouri </option>
                            <option value = "MT" > Montana </option>
                            <option value = "NE" > Nebraska </option>
                            <option value = "NV" > Nevada </option>
                            <option value = "NH" > New Hampshire </option>
                            <option value = "NJ" > New Jersey </option>
                            <option value = "NY" > New York </option>
                            <option value = "NC" > North Carolina </option>
                            <option value = "ND" > North Dakota </option>
                            <option value = "OH" > Ohio </option>
                            <option value = "OK" > Oklahoma </option>
                            <option value = "OR" > Oregon </option>
                            <option value = "PA" > Pennsylvania </option>
                            <option value = "RI" > Rhode Island </option>
                            <option value = "SC" > South Carolina </option>
                            <option value = "SD" > South Dakota </option>
                            <option value = "TN" > Tennessee </option>
                            <option value = "TX" > Texas </option>
                            <option value = "UT" > Utah </option>
                            <option value = "VT" > Vermont </option>
                            <option value = "VA" > Virginia </option>
                            <option value = "WA" > Washington </option>
                            <option value = "WV" > West Virginia </option>
                            <option value = "WI" > Wisconsin </option>
                            <option value = "WY" > Wyoming </option>
                        </select> <br /><br />
                        <label>Zipcode: </label><br />
                        <input type="text" name="zipcode" id="zipcode" value={values.zipcode} onChange={handleInputChange} size="14" required/><br />
                        <p>{errors.username}</p><br />
                    </form>
                </div>
                <button className="submit-button" type="submit" value="Submit" form="profileForm">Submit</button>
            </div>
        </div>
    )
}

export default Profile;