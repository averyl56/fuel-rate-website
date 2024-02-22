import React from 'react';
// you can use this to format the form
import '../css/formpage.css';
import useForm from '../hooks/useForm.js';
import useStateContext from '../hooks/useStateContext.js';

// page that allows a user to calculate fuel rates

// Gallons Requested (numeric, requried)
// Delivery Address (Non-editable, comes from client profile)
// Delivery Date (Calender, date picker)
// Suggested Price / gallon (numeric non-editable)
// Total Amount Due (numeric non-editable, calculated (gallons * price))

const getFreshModel = () => ({
    gallons_req: 1,
    address1: "",
    address2: "",
    state: "",
    city: "",
    zipcode: "",
    deliveryDate: "",
});

function FuelRate() {
    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);
    const {context, setContext} = useStateContext();

    const submitForm = () => {};

    const validate = () => {
        // set error messages in temp object, will display on page if there is an error
        let temp ={};
        temp.gallons_req = values.gallons_req > 0 ? "" : "Value must be greater than 0.";
        const currentDate = new Date();
        temp.delivery_date = values.delivery_date > currentDate ? "" : "Delivery date must be in the future."
        setErrors(temp);
        // checks that all error messages are blank and returns true if so
        return Object.values(temp).every(x => x == "");
    };

    return (
        <div className='form-page'>
            <div className='form-box'>
                <h2>Fuel Rate Page</h2>
                <hr style={{border:'2px solid black'}}/>
                <div className='form-inner-box'>
                    <form name="fuelRateForm" method="post" id="fuelRateForm" onSubmit={submitForm}>
                        <label>Gallons Requested: </label><br />
                        <input type="number" min="1" class="form-control" id="gallons_req" onChange={handleInputChange} name="gallons_req" value={values.gallons_req} required></input>
                        
                        <label>Delivery Date</label>
                        <input type="date" class="form-control" id="delivery_date" onChange={handleInputChange} name="delivery_date" value={values.delivery_date} required></input>
                        
                        <label>Delivery Address 1</label><br />
                        <input type="text" class="form-control" id="address1" name="address1" value={values.address1} readonly></input>

                        <label>Address 2: </label><br />
                        <input type="text" class="form-control" id="address2" name="address2" value={values.address2} readonly></input>
                        
                        <label>City: </label><br />
                        <input type="text" class="form-control" id="city" name="city" value={values.city} readonly></input>
                        
                        <label>State:</label>
                        <input type="text" class="form-control" id="state" name="state" value={values.state} readonly></input>
                        
                        <label>Zipcode: </label><br />
                        <input type="text" class="form-control" id="delivery_zipcode" name="delivery_zipcode" value={values.zipcode} readonly></input>
                    </form>
                </div>
                <button className="submit-button" type="submit" value="Submit" form="profileForm">Sign In</button>
                <p>Suggested Price: </p>
                <p>Total Amount Due: </p>
            </div>
        </div>
    );

    
}

export default FuelRate;