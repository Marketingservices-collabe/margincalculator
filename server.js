const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

app.post('/calculate-margin', (req, res) => {
    try {
        const { laborCosts, materialCosts, overheadExpenses, servicePrice } = req.body;

        if (laborCosts === undefined || materialCosts === undefined || overheadExpenses === undefined || servicePrice === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const totalCosts = laborCosts + materialCosts + overheadExpenses;
        const profit = servicePrice - totalCosts;
        const profitMargin = (profit / servicePrice) * 100;
        const markup = (profit / totalCosts) * 100;

        res.json({
            profit: profit.toFixed(2),
            profitMargin: profitMargin.toFixed(2) + '%',
            markup: markup.toFixed(2) + '%',
            data: {
                labor: laborCosts,
                material: materialCosts,
                overhead: overheadExpenses,
                profit: profit
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
