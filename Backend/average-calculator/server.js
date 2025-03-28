require("dotenv").config();
const express = require("express");
const numberService = require("./services/numberService");
const SlidingWindow = require("./utils/slidingWindow");

const app = express();
const PORT = process.env.PORT || 3000;

const windowSize = parseInt(process.env.WINDOW_SIZE) || 10;
const slidingWindow = new SlidingWindow(windowSize);

app.get("/numbers/:numberid", async (req, res) => {
    const { numberid } = req.params;
    
    try {
        const numbers = await numberService.fetchNumbers(numberid);
        if (!numbers || numbers.length === 0) {
            return res.status(500).json({ error: "Failed to fetch numbers" });
        }

        slidingWindow.add(numbers);

        res.json({
            windowPrevState: slidingWindow.getPreviousState(),
            windowCurrState: slidingWindow.getCurrentState(),
            numbers,
            avg: slidingWindow.getAverage(),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
