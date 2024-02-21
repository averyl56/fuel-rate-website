import React from 'react';
// you can use this to format the form
import '../css/formpage.css';

// page that allows a user to calculate fuel rates

// Gallons Requested (numeric, requried)
// Delivery Address (Non-editable, comes from client profile)
// Delivery Date (Calender, date picker)
// Suggested Price / gallon (numeric non-editable)
// Total Amount Due (numeric non-editable, calculated (gallons * price))

function FuelRate() {
    return (
        <div className='form-page'>
            <div className='form-box'>
                <h2>Fuel Rate Page</h2>
                <hr style={{border:'2px solid black'}}/>
                <div className='form-inner-box'>
                    <form name="fuelRateForm" method="post" id="fuelRateForm" onSubmit={doSomething}>
                        <label>Gallons Requested: </label><br />
                        <input type="Gallons Requested" class="form-control" id="gallons_req" name="gallons_req"
                placeholder="Enter Amount" required></input>
                        <label>Delivery Address 1</label><br />
                        <input type="Delivery Address 1" class="form-control" id="address1" name="address1"
              value="{{user.userInfo.address}}" readonly></input>
                        <label>Address 2: </label><br />
                        <input type="Delivery Address2" class="form-control" id="delivery_address2" name="delivery_address2"
              value="{{user.userInfo.address2}}" readonly></input>
                        <label>Delivery City: </label><br />
                        <input type="Delivery City" class="form-control" id="delivery_city" name="delivery_city"
              value="{{user.userInfo.city}}" readonly></input>
                        <label>Delivery State:</label>
                        <input type="Delivery State" class="form-control" id="delivery_state" name="delivery_state"
              value="{{user.userInfo.state}}" readonly></input>
                        <label>Delivery Zipcode: </label><br />
                        <input type="Delivery Zipcode" class="form-control" id="delivery_zipcode" name="delivery_zipcode"
              value="{{user.userInfo.zipcode}}" readonly></input>
                        <label>Delivery Date</label>
                        <input type="Date" class="form-control" id="delivery_date" name="delivery_date" placeholder="Enter Date" required></input>
                        <label>Suggested Price</label>
                        <input type="Suggested Price" class="form-control" id="suggested_price" name="suggested_price"
              value="{{user.quotes.suggested_price}}" readonly></input>
                        <label>Total Amount</label>
                        <input type="Total Amount" class="form-control" id="total_amount" name="total_amount"
              value="{{user.quotes.total_amount}}" readonly></input>
                    </form>
                </div>
                <button className="submit-button" type="submit" value="Submit" form="profileForm">Sign In</button>
            </div>
        </div>
    );
}

export default FuelRate;