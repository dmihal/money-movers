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

const coins = ['btc', 'eth', 'usdt', 'usdc', 'usdt_eth', 'dai', 'weth', 'wbtc', 'bch', 'xrp'];

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
