import React, { useState, useEffect } from 'react';
import useStateContext from '../hooks/useStateContext';
import { endpointConnection,ENDPOINTS } from '../api/index.js';
import '../css/QuoteHistoryPage.css'; // Import CSS file for styling

const sampleQuotes = [
    { id: 1, gallonsRequested: 100, totalPrice: 2000, date: '2024-02-16' },
    { id: 2, gallonsRequested: 150, totalPrice: 3000, date: '2024-02-15' },
    { id: 3, gallonsRequested: 200, totalPrice: 4000, date: '2024-02-14' },
];

// Page that shows a user's fuel quote history once they logged in
function QuoteHistory() {
    // State to store the list of fuel quotes
    const [quotes, setQuotes] = useState([]);
    const [context, setContext] = useStateContext();

    // Function to fetch fuel quotes from the backend
    const fetchQuotes = (e) => {
        e.preventDefault();
        if (context.login_id) {
            endpointConnection(ENDPOINTS.quotehistory)
            .get(context.login_id)
            .then (res => {
                setQuotes(res.data);
            })
            .catch(error => {
                console.log(error);
                alert(error.response.data);
            })
        }
        else {
            setQuotes(sampleQuotes);
        }
    };

    // Fetch quotes when the component mounts
    /* 
    to Johnny: -add the backend GET connection call here or put it in the fetchQuotes function
    -include the username as a parameter in the GET request ex: endpointConnection(ENDPOINTS.quoteHistory+"/"+username)
    -you can get the username from the useStateContext hook
    */
    useEffect(() => {
        fetchQuotes();
    }, []);

    return (
        <div className="quote-history-container">
            <h2>Quote History</h2>
            <table>
                <thead>
                    <tr>
                    <th className="black-text">ID</th>
                        <th className="black-text">Gallons Requested</th>
                        <th className="black-text">Total Price</th>
                        <th className="black-text">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {quotes.map(quote => (
                        <tr key={quote.id}>
                            <td>{quote.id}</td>
                            <td>{quote.gallonsRequested}</td>
                            <td>${quote.totalPrice.toFixed(2)}</td> {/* Format price with 2 decimal places */}
                            <td>{quote.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default QuoteHistory;
