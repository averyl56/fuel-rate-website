// app.get('/quoteHistory/:username', async (req, res) => {
//     const { username } = req.params;
//     try {
//         const quoteHistory = await getQuoteHistory(username);
//         res.json(quoteHistory);
//     } catch (error) {
//         console.error('Error fetching quote history:', error);
//         res.status(500).send('Error fetching quote history');
//     }
// });