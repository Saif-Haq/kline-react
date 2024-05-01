import '@klinecharts/pro/dist/klinecharts-pro.css';
import { Time, TimeChartOptions, createChart } from 'lightweight-charts';
import { useLayoutEffect } from 'react';
import './App.css';


function App() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const firstChart = createChart(document?.getElementById('firstContainer') as HTMLElement);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const charKt = new KLineChartPro({
  //   container: document.getElementById('container1') as HTMLElement,
  //   // Default symbol info
  //   symbol: {
  //     exchange: 'XNYS',
  //     market: 'stocks',
  //     name: 'Alibaba Group Holding Limited American Depositary Shares, each represents eight Ordinary Shares',
  //     shortName: 'BABA',
  //     ticker: 'AA',
  //     priceCurrency: 'usd',
  //     type: 'ADRC',
  //   },
  //   watermark: "", //EMPTY OR NODE
  //   locale: "en-US", //Language
  //   drawingBarVisible: false,
  //   // Default period
  //   period: { multiplier: 15, timespan: 'minute', text: '15m' },
  //   // The default data access is used here. If the default data is also used in actual use, you need to go to the https://polygon.io/ apply for API key
  //   datafeed: new DefaultDatafeed(`IR3qS2VjZ7kIDgnlqKxSmCRHqyBaMh9q`)
  // })

  // console.log(charKt.getStyles())
  // change default top & bottom colors of an area series in creating time

  useLayoutEffect(() => {

    const container = document.getElementById('container')

    if (container) {
      console.log("????????????????>>>>>>>>>", container)
      const chart = createChart(document.getElementById('container') as HTMLElement, {
        leftPriceScale: {
          visible: true,
          borderColor: '#555ffd',
        },
        rightPriceScale: {
          visible: false,
        },

        watermark: { visible: false },
        locale: "en-US", //Language

        layout: { textColor: 'black', background: { type: 'solid', color: 'white' } }
      });
      const candlestickSeries = chart.addCandlestickSeries({ upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });

      candlestickSeries.setData([{ open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 as Time }, { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 as Time }, { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 as Time }, { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 as Time }, { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 as Time }, { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 as Time }, { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 as Time }, { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 as Time }, { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 as Time }, { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 as Time }]);

      // candlestickSeries.setData(data);

      chart.timeScale().fitContent();

    }

  }, [])


  return (
    <>
      {/* <div id="container1" style={{ overflow: "hidden" }} /> */}

      <div id="container" style={{ height: '100vh', width: '100vw' }} />
    </>

  )
}

export default App
