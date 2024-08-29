function getArray()
{
    let array = [];

    for (let i = 0; i < 5; i++)
    {
        let randomNumber = Math.floor(Math.random() * 100) + 1;
        array.push(randomNumber);
    }

    document.getElementById('arrayOutput').innerHTML = `The array is: ${array.join(', ')}`;

    let mean = array.reduce((a, b) => a + b) / array.length;

    document.getElementById('meanOutput').innerHTML =
        `The mean is: ${mean.toFixed(1)}`;

    document.getElementById('greaterOutput').innerHTML = 
        `Greater: ${array.filter(num => num > mean).join(', ')}`;
}
