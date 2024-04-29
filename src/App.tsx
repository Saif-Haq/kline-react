import { DefaultDatafeed, KLineChartPro } from '@klinecharts/pro';
import '@klinecharts/pro/dist/klinecharts-pro.css';
import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {

    const charKt = new KLineChartPro({
      container: document.getElementById('container1') as HTMLElement,
      // Default symbol info
      symbol: {
        exchange: 'XNYS',
        market: 'stocks',
        name: 'Alibaba Group Holding Limited American Depositary Shares, each represents eight Ordinary Shares',
        shortName: '2',
        ticker: 'AA',
        priceCurrency: 'usd',
        type: 'ADRC',
      },
      // Default period
      period: { multiplier: 15, timespan: 'minute', text: '15m' },
      // The default data access is used here. If the default data is also used in actual use, you need to go to the https://polygon.io/ apply for API key
      datafeed: new DefaultDatafeed(`IR3qS2VjZ7kIDgnlqKxSmCRHqyBaMh9q`)
    })

    console.log(charKt);

  }, [])

  return (<>
    <div id="container1" style={{ overflow: "hidden" }} />

  </>
  )
}

export default App
