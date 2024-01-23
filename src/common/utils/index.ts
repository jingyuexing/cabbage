export function weigthVariance([...numberData]: Array<number>, [...weigth]: Array<number>) {
    let totalWigth: number = 0, totaNumber: number = 0;
    if (numberData.length == weigth.length) {
        for (let i: number = 0; i < numberData.length; i++) {
            totalWigth += weigth[i];
            totaNumber += numberData[i] * weigth[i];
        }
    } else {
        throw Error("权重值和数据不匹配!");
    }
    return totaNumber / totalWigth;
}