async function getAssetData(asset: string) {
  const req = await fetch(`https://community-api.coinmetrics.io/v2/assets/${asset}/metricdata?metrics=TxTfrValUSD&start=2020-11-01`);
  const response = await req.json();
  return response.metricData.series.map((day: any) => ({
    time: day.time,
    value: parseFloat(day.values[0]),
  }));
}

export async function getData() {
  const [btcData, ethData, usdtData, usdcData, usdt_eth, dai, weth, wbtc] = await Promise.all(
    ['btc', 'eth', 'usdt', 'usdc', 'usdt_eth', 'dai', 'weth', 'wbtc'].map(getAssetData));

  return btcData.map((day: any, i: number) => {
    return {
      date: day.time,
      btc: day.value,
      eth: ethData[i].value,
      usdt: usdtData[i].value,
      usdc: usdcData[i].value,
      usdt_eth: usdt_eth[i].value,
      dai: dai[i].value,
      weth: weth[i].value,
      wbtc: wbtc[i].value,
    };
  });
}
