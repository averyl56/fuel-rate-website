import React, { useState, useEffect } from 'react';
import './QuoteHistoryPage.css'; // Import CSS file for styling

// Page that shows a user's fuel quote history once they logged in
function QuoteHistory() {
    // State to store the list of fuel quotes
    const [quotes, setQuotes] = useState([]);

    // Function to fetch fuel quotes from the backend
    const fetchQuotes = () => {
        // In a real application, you would make an API call to fetch quotes from the backend
        // For now, we can hardcode some sample data
        const sampleQuotes = [
            { id: 1, gallonsRequested: 100, totalPrice: 2000, date: '2024-02-16' },
            { id: 2, gallonsRequested: 150, totalPrice: 3000, date: '2024-02-15' },
            { id: 3, gallonsRequested: 200, totalPrice: 4000, date: '2024-02-14' },
        ];
        setQuotes(sampleQuotes);
    };

    // Fetch quotes when the component mounts
    useEffect(() => {
        fetchQuotes();
    }, []);

    return (
        <div className="quote-history-container">
            <h2>Quote History</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Gallons Requested</th>
                        <th>Total Price</th>
                        <th>Date</th>
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
