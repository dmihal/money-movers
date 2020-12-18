import { format, subDays } from 'date-fns';
const startDate = format(subDays(new Date(), 180), 'yyyy-MM-dd');

async function getAssetData(asset: string) {
  const req = await fetch(`https://community-api.coinmetrics.io/v2/assets/${asset}/metricdata?metrics=TxTfrValUSD&start=${startDate}`);
  const response = await req.json();
  return response.metricData.series.map((day: any) => ({
    time: day.time,
    value: parseFloat(day.values[0]),
  }));
}

function getPreviousMA(list: any[], day: number, previousDays: number): number {
  return list.slice(day - previousDays, day)
    .reduce((total, item) => total + item.value, 0) / previousDays;
}

export async function getData(movingAverage: number) {
  const [btcData, ethData, usdtData, usdcData, usdt_eth, dai, weth, wbtc] = await Promise.all(
    ['btc', 'eth', 'usdt', 'usdc', 'usdt_eth', 'dai', 'weth', 'wbtc'].map(getAssetData));

  return btcData.slice(movingAverage).map((day: any, i: number) => {
    return {
      date: day.time,
      btc: getPreviousMA(btcData, i + movingAverage, movingAverage),
      eth: getPreviousMA(ethData, i + movingAverage, movingAverage),
      usdt: getPreviousMA(usdtData, i + movingAverage, movingAverage),
      usdc: getPreviousMA(usdcData, i + movingAverage, movingAverage),
      usdt_eth: getPreviousMA(usdt_eth, i + movingAverage, movingAverage),
      dai: getPreviousMA(dai, i + movingAverage, movingAverage),
      weth: getPreviousMA(weth, i + movingAverage, movingAverage),
      wbtc: getPreviousMA(wbtc, i + movingAverage, movingAverage),
    };
  });
}
