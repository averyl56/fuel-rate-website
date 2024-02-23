import React from 'react';

// page that shows a user's fuel quote history once they logged in
// import use form hook
function QuoteHistory() {
    //const {context, setContext} = useStateContext()
    
    return (
    <div className='form-page'>
        <div className='form-box2'>
            <h2>Fuel Quote History</h2>
            <hr style={{border:'2px solid black'}}/>
            <table cellPadding={10}>
                
                <tr>
                    <th>Order #</th>
                    <th>Date</th>
                    <th>Fuel Requested (gal)</th>
                    <th>Address</th>
                    <th>Total Price</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>01/11/24</td>
                    <td>100</td>
                    <td>1234 UH Blvd, Houston, TX 77204</td>
                    <td>$10,000</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>02/24/24</td>
                    <td>200</td>
                    <td>5678 MLK Blvd, Houston, TX 77204</td>
                    <td>$20,000</td>
                </tr>
            </table>
        </div>
    </div>
    )
}

export default QuoteHistory;