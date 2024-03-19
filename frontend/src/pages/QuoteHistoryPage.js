import React, { useState, useEffect } from 'react';
import './QuoteHistoryPage.css'; // Import CSS file for styling

function QuoteHistory() {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        try {
            const response = await fetch('http://localhost:5000/quoteHistory'); // Assuming your backend endpoint is '/quoteHistory'
            if (!response.ok) {
                throw new Error('Failed to fetch quotes');
            }
            const data = await response.json();
            setQuotes(data);
        } catch (error) {
            console.error('Error fetching quotes:', error);
        }
    };

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
                            <td>${quote.totalPrice.toFixed(2)}</td>
                            <td>{quote.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default QuoteHistory;
