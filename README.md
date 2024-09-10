# Express Calculator

For this exercise, you will build an Express.js application that performs three statistical operations given an arbitrary amount of numbers:

1. **mean** (average)
2. **median** (midpoint)
3. **mode** (most frequent)

The operations are invoked via **one route per operation**.

## **Requirements**

The three base routes are ***/mean***, ***/median***, ***/mode***. All accept GET requests

---
(To Do)
## Further Study

- Make a route called ***/all*** that does all three operations at the same time, with the response from each of them as a key in the JSON response. It can look like this:
```javascript
response: {
  operation: "all",
  mean: 12
  median: 10,
  mode: 8
}
```

- Provide special handling for an optional query key called ***save*** that can be set to ***true***. This means the operation will write to a file. For example, ***/median?nums=1,3,5&save=false*** will return a json response and will write to a file called ***results.json***.
- Insert a timestamp for every operation that writes to a file.
- Honor the Accept header. Return json if the client requests application/json and return html if the client requests text/html.