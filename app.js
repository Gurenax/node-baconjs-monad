const fetch = require('node-fetch')
const bacon = require('baconjs')

const fetchSomeData = num => {
  const promise = fetch(`https://jsonplaceholder.typicode.com/posts/${num}`)
    .then(response => response.json())

  const stream = bacon.fromPromise(promise)
  return stream
}

const stream = new bacon.Bus()

stream
  .flatMap(input => fetchSomeData(input))   // flatMap flattens the Promise data into the expected JSON structure instead of returning a Promise
  .map(result => result.title)  // Just get the title from the Result JSON
  .onValue(title => console.log('Title: ', title)) // Output the Title

// Output
stream.push(1)
stream.push(2)
stream.push(3)