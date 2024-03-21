import React, { useState, useEffect } from 'react';
import '../css/formpage.css';
import useForm from '../hooks/useForm.js';
import useStateContext from '../hooks/useStateContext.js';
import { ENDPOINTS, endpointConnection } from '../api/index.js';

// page that allows a user to calculate fuel rates

// Gallons Requested (numeric, requried)
// Delivery Address (Non-editable, comes from client profile)
// Delivery Date (Calender, date picker)
// Suggested Price / gallon (numeric non-editable)
// Total Amount Due (numeric non-editable, calculated (gallons * price))

const getFreshModel = () => ({
    userId: 0,
    gallonsRequested: 1,
    address1: "",
    address2: "",
    state: "",
    city: "",
    zipcode: "",
    deliveryDate: "",
});

function FuelRate() {
    const {context, setContext} = useStateContext();
    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);
    const [suggestedPrice, setSuggestedPrice] = useState("...");
    const [totalAmount, setTotalAmount] = useState("...");

    useEffect(() => {
        if (context.login_id)
            getUserInfo();
    },[]);

    const getUserInfo = () => {
        endpointConnection(ENDPOINTS.profile)
        .get(context.login_id)
        .then(res => {
            setValues({...values,
                userId: context.login_id,
                address1: res.data.address1,
                address2: res.data.address2,
                city: res.data.city,
                state: res.data.state,
                zipcode: res.data.zipcode});
        })
        .catch(error => {
            console.log(error);
        })
    };


    const getFuelRate = (e) => {
        e.preventDefault();
        if (validate()) {
            endpointConnection(ENDPOINTS.fuelrate)
            .post(values)
            .then(res => {
                console.log(res.data);
                setSuggestedPrice(res.data.suggestedPrice);
                setTotalAmount(res.data.totalAmount);
            })
            .catch(error => {
                console.log(error);
                try {
                    alert(error.response.data);
                }
                catch (err) {
                    alert(error.message);
                }
            })
        }
    };


    const validate = () => {
        // set error messages in temp object, will display on page if there is an error
        let temp ={};
        temp.gallonsRequested = values.gallonsRequested > 0 ? "" : "Value must be greater than 0.";
        temp.deliveryDate = new Date(values.deliveryDate) > new Date() ? "" : "Delivery date must be in the future.";
        temp.address = values.address1 != "" ? "" : "You must enter an address.";
        temp.city = values.city != "" ? "" : "You must enter a city.";
        temp.state = values.state != "" ? "" : "You must select a state.";
        temp.zipcode = values.zipcode != "" ? "" : "You must enter a zip code.";
        setErrors(temp);
        // checks that all error messages are blank and returns true if so
        return Object.values(temp).every(x => x == "");
    };

    return (
        <div className='form-page'>
            <div className='form-box'>
                <h2>Calculate Your Fuel Rate</h2>
                <hr style={{border:'2px solid black'}}/>
                {context.login_id == 0 && <p>Calculations will not be saved. Please log in to save your fuel quote history.</p>}
                <div className='form-inner-box'>
                    <form name="fuelRateForm" method="post" id="fuelRateForm" onSubmit={getFuelRate}>
                        <label>Gallons Requested: </label><br />
                        <input type="number" min="1" class="form-control" id="gallonsRequested" onChange={handleInputChange} name="gallonsRequested" value={values.gallonsRequested} required></input>
                        <p>{errors.gallonsRequested}</p><br />
                        <label>Delivery Date</label>
                        <input type="date" class="form-control" id="deliveryDate" onChange={handleInputChange} name="deliveryDate" value={values.deliveryDate} required></input>
                        <p>{errors.deliveryDate}</p><br />
                        <label>Delivery Address 1</label><br />
                        <input type="text" class="form-control" id="address1" name="address1" value={values.address1} readOnly={context.login_id}></input>
                        <p>{errors.address1}</p><br />
                        <label>Address 2: </label><br />
                        <input type="text" class="form-control" id="address2" name="address2" value={values.address2} readOnly={context.login_id}></input>
                        <p>{errors.address2}</p><br />
                        <label>City: </label><br />
                        <input type="text" class="form-control" id="city" name="city" value={values.city} readOnly={context.login_id}></input>
                        <p>{errors.city}</p><br />
                        <label>State:</label>
                        <input type="text" class="form-control" id="state" name="state" value={values.state} readOnly={context.login_id}></input>
                        <p>{errors.state}</p><br />
                        <label>Zipcode: </label><br />
                        <input type="text" class="form-control" id="delivery_zipcode" name="delivery_zipcode" value={values.zipcode} readOnly={context.login_id}></input>
                        <p>{errors.zipcode}</p><br />
                    </form>
                </div>
                <br />
                <button className="submit-button" type="submit" value="Submit" form="fuelRateForm">Get Fuel Rate</button>
                <br /><br />
                <p>Suggested Price per Gallon: {suggestedPrice.toFixed(2)} </p>
                <p>Total Amount Due: {totalAmount.toFixed(2)} </p>
            </div>
        </div>
    );

    
}

export default FuelRate;