const express = require('express');

const app = express();

app.get('/mean', function (req, res) {
    if (!req.query.nums)
        return res.status(400).json("There was no input. Please provide a request like: /mean?nums=5,10");
    const nums = !req.query.nums.includes(",") ?
        [req.query.nums] :
        req.query.nums.split(",");
    if (nums.length === 0)
        return res.status(400).json("There was no input. Please provide a request like: /mean?nums=5,10");
    let mean = 0;
    for (const num of nums) {
        if (num === "" || isNaN(num))
            return res.status(400).json(`${num} is not a number. Please fix your input`);
        mean += +num;
    }
    res.json({
        'response': {
            'operation': 'mean',
            'value': mean / nums.length
        }
    });
});

app.get('/median', function (req, res) {
    if (!req.query.nums)
        return res.status(400).json("There was no input. Please provide a request like: /median?nums=5,10");
    const nums = !req.query.nums.includes(",") ?
        [req.query.nums] :
        req.query.nums.split(",");
    if (nums.length === 0)
        return res.status(400).json("There was no input. Please provide a request like: /median?nums=5,10");
    let numsConverted = [];
    for (const num of nums) {
        if (num === "" || isNaN(num))
            return res.status(400).json(`${num} is not a number. Please fix your input`);
        numsConverted.push(+num);
    }
    const sorted = numsConverted.toSorted((a, b) => a - b);
    res.json({
        'response': {
            'operation': 'median',
            'value': nums.length % 2 ?
                sorted[Math.floor((nums.length - 1) / 2)] :
                (sorted[Math.floor((nums.length - 1) / 2)] + sorted[Math.floor((nums.length - 1) / 2) + 1]) / 2
        }
    });
});

app.get('/mode', function (req, res) {
    if (!req.query.nums)
        return res.status(400).json("There was no input. Please provide a request like: /mode?nums=5,5,10,10,10");
    const nums = !req.query.nums.includes(",") ?
        [req.query.nums] :
        req.query.nums.split(",");
    if (nums.length === 0)
        return res.status(400).json("There was no input. Please provide a request like: /mode?nums=5,5,10,10,10");
    // let numsConverted = [];
    for (const num of nums) {
        if (num === "" || isNaN(num))
            return res.status(400).json(`${num} is not a number. Please fix your input`);
        // numsConverted.push(+num);
    }
    const occurences = {};
    nums.map(v => {
        if (!occurences[v])
            occurences[v] = 1;
        else
            occurences[v]++;
    });
    let mode = [];
    let highestOccurrence = -Infinity;
    for (const [k, v] of Object.entries(occurences))
        if (v > highestOccurrence) {
            highestOccurrence = v;
            mode = [k];
        } else if (v === highestOccurrence)
            mode.push(k);
    res.json({
        'response': {
            'operation': 'mode',
            'value': mode
        }
    });
});

app.listen(3000, function () {
    console.log('App on port 3000');
});

module.exports = app;