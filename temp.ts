function minusOne(n: number, i: number) {
    const currDigit = Math.floor(n / 10 ** (i - 1)) - Math.floor(n / 10 ** i) * 10;
    const newDigit = (currDigit - 1 + 10) % 10;
    return Math.floor(n / 10 ** i) * 10 ** i + newDigit * 10 ** (i - 1) + (n % 10 ** (i - 1));
}

function addOne(n: number, i: number) {
    const currDigit = Math.floor(n / 10 ** (i - 1)) - Math.floor(n / 10 ** i) * 10;
    const newDigit = (currDigit + 1) % 10;
    return Math.floor(n / 10 ** i) * 10 ** i + newDigit * 10 ** (i - 1) + (n % 10 ** (i - 1));
}

function openLock(deadends: string[], target: string): number {
    let q0: number[] = [];
    let q1: number[] = [];
    const deadendsSet: Set<number> = new Set(deadends.map((d) => Number(d) + 10000));
    let visited0: Set<number> = new Set();
    let visited1: Set<number> = new Set();
    let steps = 0;
    q0.push(10000);
    q1.push(Number(target) + 10000);

    while (q0.length) {
        const size = q0.length;
        for (let i = 0; i < size; i++) {
            const currStep = q0.shift();
            if (!currStep) {
                break;
            }
            if (deadendsSet.has(currStep)) {
                continue;
            }
            if (visited1.has(currStep)) {
                return steps - 1;
            }
            if (visited0.has(currStep)) {
                continue;
            }
            visited0.add(currStep);
            for (let i = 0; i < 4; i++) {
                q0.push(addOne(currStep, i));
                q0.push(minusOne(currStep, i));
            }
        }
        const temp = q0;
        q0 = q1;
        q1 = temp;
        const tempVisited = visited0;
        visited0 = visited1;
        visited1 = tempVisited;
        steps += 1;
    }

    return -1;
}

const deadends = [
    '5557',
    '5553',
    '5575',
    '5535',
    '5755',
    '5355',
    '7555',
    '3555',
    '6655',
    '6455',
    '4655',
    '4455',
    '5665',
    '5445',
    '5645',
    '5465',
    '5566',
    '5544',
    '5564',
    '5546',
    '6565',
    '4545',
    '6545',
    '4565',
    '5656',
    '5454',
    '5654',
    '5456',
    '6556',
    '4554',
    '4556',
    '6554',
];
const target = '5555';
console.log(openLock(deadends, target));
