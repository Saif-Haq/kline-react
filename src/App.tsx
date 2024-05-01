import { CandleType, init, registerIndicator, registerOverlay } from 'klinecharts';
import { useLayoutEffect } from 'react';
import './App.css';
import { genData } from './utils';

const mainIndicators = ['MA', 'BOLL', 'Custom']
const subIndicators = ['VOL', 'MACD', 'Custom']
const fruits = [
  '🍏', '🍎', '🍐', '🍊', '🍋', '🍌',
  '🍉', '🍇', '🍓', '🍈', '🍒', '🍑',
  '🍍', '🥥', '🥝', '🥭', '🥑', '🍏'
]

registerIndicator({
  name: 'Custom',
  figures: [
    { key: 'emoji' }
  ],
  calc: (kLineDataList) => {
    return kLineDataList.map(kLineData => ({ emoji: kLineData.close, text: fruits[Math.floor(Math.random() * 17)] }))
  },
  draw: ({
    ctx,
    barSpace,
    visibleRange,
    indicator,
    xAxis,
    yAxis
  }) => {
    const { from, to } = visibleRange

    ctx.font = barSpace.gapBar + 'px' + ' Helvetica Neue'
    ctx.textAlign = 'center'
    const result = indicator.result
    for (let i = from; i < to; i++) {
      const data = result[i]
      const x = xAxis.convertToPixel(i)
      const y = yAxis.convertToPixel(data.emoji)
      ctx.fillText(data.text, x, y)
    }
    return false
  }
})

registerOverlay({
  name: 'circle',
  // styles: {
  //   circle: {
  //     color: "#225522"
  //   }
  // },

  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  totalStep: 3,
  onDrawEnd: function (event) {
    // console.log("ODE>>>>>>>>", event)
    localStorage.setItem("MYEVENT", JSON.stringify(event.overlay))
    return true;
  },
  createPointFigures: ({ coordinates }) => {
    // console.log(coordinates)
    if (coordinates.length === 2) {
      const xDis = Math.abs(coordinates[0].x - coordinates[1].x)
      const yDis = Math.abs(coordinates[0].y - coordinates[1].y)
      const radius = Math.sqrt(xDis * xDis + yDis * yDis)

      return {
        key: 'circle',
        type: 'circle',
        attrs: {
          ...coordinates[0],
          r: radius
        },
        styles: {
          style: 'stroke_fill',
        }
      }
    }
    return []
  }

})

// registerOverlay({
//   name: 'circleX',

//   needDefaultPointFigure: true,
//   needDefaultXAxisFigure: true,
//   needDefaultYAxisFigure: true,
//   totalStep: 3,
//   // onDrawStart: ({ x }) => { console.log("x", x) },
//   createPointFigures: ({ coordinates }) => {
//     // console.log("i was here")
//     // console.log(coordinates)
//     const myCoords = [{ x: 741.5, y: 363 }, { x: 780, y: 499 }]
//     const xDis = Math.abs(myCoords[0].x - myCoords[1].x)
//     const yDis = Math.abs(myCoords[0].y - myCoords[1].y)
//     const radius = Math.sqrt(xDis * xDis + yDis * yDis)

//     return {
//       key: 'circleX',
//       type: 'circleX',
//       attrs: {
//         coordinates: myCoords,
//         r: radius
//       },
//       styles: {
//         style: 'stroke_fill'
//       }
//     }
//     return []
//   }

// })

function App() {

  useLayoutEffect(() => {
    const chart = init('k-line-chart')
    if (chart) {

      chart.applyNewData(genData())

      const container = document.getElementById('container')
      const buttonContainer = document.createElement('div')
      buttonContainer.className = 'button-container'
      const items = [
        { key: 'candle_solid', text: 'All solid' },
        { key: 'candle_stroke', text: 'All stroke' },
        { key: 'candle_up_stroke', text: 'Up stroke' },
        { key: 'candle_down_stroke', text: 'Down stroke' },
        { key: 'ohlc', text: 'OHLC' },
        { key: 'area', text: 'Area' }
      ]
      items.forEach(({ key, text }) => {
        const button = document.createElement('button')
        button.innerText = text
        button.addEventListener('click', () => {
          chart.setStyles({
            candle: { type: key as CandleType }
          })
        })
        buttonContainer.appendChild(button)
      })

      const mainTitle = document.createElement('span')
      mainTitle.innerText = 'Main indicator: '
      buttonContainer.appendChild(mainTitle)
      mainIndicators.forEach((name) => {
        const button = document.createElement('button')
        button.innerText = name

        button.addEventListener('click', () => { chart.createIndicator(name, true, { id: 'candle_pane' }) })
        buttonContainer.appendChild(button)
      })

      const subTitle = document.createElement('span')
      subTitle.style.paddingLeft = '16px'
      subTitle.innerText = 'Sub indicator: '
      buttonContainer.appendChild(subTitle)
      subIndicators.forEach((name) => {
        const button = document.createElement('button')
        button.innerText = name
        button.addEventListener('click', () => { chart.createIndicator(name) })
        buttonContainer.appendChild(button)
      })

      const button = document.createElement('button')
      button.innerText = "Circle(custom)"
      button.addEventListener('click', () => { chart.createOverlay("circle") })
      buttonContainer.appendChild(button)

      // chart.createOverlay("circleX")

      const theme_items = [
        { key: "light", text: 'Light' },
        { text: 'Dark', key: "dark" },
      ]
      theme_items.forEach(({ text, key }) => {
        const button = document.createElement('button')
        button.innerText = text
        button.addEventListener('click', () => {
          chart.setStyles(key)
          const theChart = document.getElementById('k-line-chart')
          if (theChart && theChart.style && theChart.style?.backgroundColor) {

            if (key === 'light') {
              theChart.style.backgroundColor = '#ffffff'
            } else if (key === 'dark') {
              theChart.style.backgroundColor = '#1b1b1f'
            }
          }
        })
        buttonContainer.appendChild(button)
      })

      container && container.appendChild(buttonContainer)

      if (localStorage.getItem("MYEVENT")) {
        console.log(JSON.parse(localStorage.getItem("MYEVENT") || ""))
        chart.createOverlay(JSON.parse(localStorage.getItem("MYEVENT") || ""))
      }
    }

  });

  return (
    <div id="container">
      <div id="k-line-chart" style={{ height: "430px" }}></div>
    </div>
  )

}

export default App
