function corpFlightBookings(bookings: number[][], n: number): number[] {
    const answerDiff = new Array(n).fill(0);
    for (const booking of bookings) {
        const [first, last, seats] = booking;
        if (first - 1 >= 0) {
            answerDiff[first - 1] += seats
        }
        if (last < answerDiff.length) {
            answerDiff[last] -= seats
        }
    }
    const answer = new Array(n).fill(0);
    answer[0] = answerDiff[0]
    for (let i = 1; i < n; i++) {
        answer[i] = answer[i - 1] + answerDiff[i]
    }
    return answer
};