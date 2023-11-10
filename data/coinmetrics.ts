import { format, subDays } from 'date-fns';
const startDate = format(subDays(new Date(), 270), 'yyyy-MM-dd');

async function getAssetData(asset: string) {
  const req = await fetch(`https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?page_size=10000&metrics=TxTfrValAdjUSD&assets=${asset}&start_time=${startDate}`);
  const response = await req.json();

  if (!response.data) {
    console.error(response);
    throw new Error('Invalid response from Coinmetrics');
  }

  return response.data.map((day: any) => ({
    time: day.time,
    value: parseFloat(day.TxTfrValAdjUSD),
  }));
}

function getPreviousMA(list: any[], day: number, previousDays: number): number {
  return list.slice(day - previousDays, day)
    .reduce((total, item) => total + item.value, 0) / previousDays;
}

const coins = ['btc', 'eth', 'usdc', 'usdt_eth', 'dai', 'weth', 'wbtc', 'bch', 'xrp'];

export async function getData(movingAverage: number) {
  const coinData = await Promise.all(coins.map(getAssetData));

  return coinData[0].slice(movingAverage).map((day: any, i: number) => {
    const dayValue: any = { date: day.time };
    coins.forEach((coin: string, j: number) => {
      dayValue[coin] = getPreviousMA(coinData[j], i + movingAverage, movingAverage);
    });
    return dayValue;
  });
}
