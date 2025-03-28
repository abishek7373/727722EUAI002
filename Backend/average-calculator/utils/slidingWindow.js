class SlidingWindow {
    constructor(size) {
        this.size = size;
        this.queue = [];
        this.prevState = [];
    }

    add(numbers) {
        this.prevState = [...this.queue];

        numbers.forEach(num => {
            if (!this.queue.includes(num)) {
                if (this.queue.length >= this.size) {
                    this.queue.shift(); 
                }
                this.queue.push(num);
            }
        });
    }

    getPreviousState() {
        return [...this.prevState];
    }

    getCurrentState() {
        return [...this.queue];
    }

    getAverage() {
        if (this.queue.length === 0) return 0;
        return this.queue.reduce((sum, num) => sum + num, 0) / this.queue.length;
    }
}

module.exports = SlidingWindow;
