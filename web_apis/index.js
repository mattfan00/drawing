const rocket = document.querySelector(".rocket")
const percentage = document.querySelector(".percentage")
const explosion = document.querySelector(".explosion")

let maxHeight
let percentChange

const initialize = () => {
  // takes the height of the browser, subtracts the position of moon, subtracts the
  // position of rocket, subtracts half of moons height, subtracts half of rockets height
  maxHeight = window.innerHeight - 20 - 20 - 50 - 35
  console.log(maxHeight)
}

const getData = async () => {
  initialize()

  const result = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=GME&apikey=ARZR7D2NAJJWVC9P")
  const data = await result.json()
  console.log(data)

  const timeSeries = data["Time Series (Daily)"]
  const recentDay = timeSeries[Object.keys(timeSeries)[0]]
  const previousDay = timeSeries[Object.keys(timeSeries)[1]]

  const recentClose = recentDay["4. close"]
  const previousClose = previousDay["4. close"]

  // you can change percentChange manually here
  percentChange = ((recentClose - previousClose) / previousClose) * 100

  percentage.textContent = `${percentChange.toFixed(2)}%`
  let color
  if (percentChange > 0) {
    color = "#16cc16"
  } else if (percentChange == 0) {
    color = "#c2c2c2"
  } else {
    color = "red"
  }
  percentage.style.color = color

  moveRocket()
}

const moveRocket = () => {
  // if grew more than 100% in one day, go to the moon
  if (percentChange >= 100) {
    rocket.style.transform = `translateY(-${maxHeight}px)`
  } else if (percentChange > 0) {
    rocket.style.transform = `translateY(-${maxHeight * (percentChange / 100)}px)`
  } else {
    explosion.style.display = "block"
  }
}


window.addEventListener("load", getData)