import React, { useState } from 'react';
import Head from 'next/head';
import { NextPage, GetStaticProps } from 'next';
import { getData } from 'data/coinmetrics';
import Chart from 'components/Chart';

interface HomeProps {
  data: any;
}

function getSum(assets: string[], day: any): number {
  return assets.reduce((total: number, asset: string) => total + day[asset], 0);
}

const allBtcAssets = ['btc', 'usdt'];
const allEthAssets = ['eth', 'usdc', 'usdt_eth', 'dai', 'weth', 'wbtc'];

function contains(list: string[], val: string) {
  return list.indexOf(val) !== -1;
}
function toggle(list: string[], val: string) {
  const index = list.indexOf(val);
  if (index === -1) {
    return [...list, val];
  } else {
    const newList = [...list];
    newList.splice(index, 1);
    return newList;
  }
}

export const Home: NextPage<HomeProps> = ({ data }) => {
  const [btcAssets, setBtcAssets] = useState(allBtcAssets);
  const [ethAssets, setEthAssets] = useState(allEthAssets);

  let filteredData = data.map((day: any) => ({
    date: (new Date(day.date)).getTime() / 1000,
    btc: getSum(btcAssets, day),
    eth: getSum(ethAssets, day),
  }))

  return (
    <div className="container">
      <Head>
        <title>Crypto Fees</title>
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <meta property="og:title" content="Crypto Fees" />
        <meta property="og:image" content="https://cryptofees.info/api/screenshot" />
        <meta
          property="og:description"
          content="There's tons of crypto projects. Which ones are people actually paying to use?"
        />

        <meta name="twitter:title" content="Crypto Fees" />
        <meta
          name="twitter:description"
          content="There's tons of crypto projects. Which ones are people actually paying to use?"
        />
        <meta
          name="twitter:image"
          content={`https://cryptofees.info/api/screenshot?${new Date().getDate()}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main>
        <h1 className="title">Money Movers</h1>

        <p className="description">
          Which blockchain is settling more value?
        </p>

        <div>
          <a
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            className="twitter-share-button"
            data-show-count="true"
          >
            Tweet
          </a>
          <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>

        <Chart data={filteredData}/>

        <div>
          <div>Bitcoin:</div>
          {allBtcAssets.map((asset: string) => (
            <button
              style={{ background: contains(btcAssets, asset) ? 'white' : 'gray' }}
              onClick={() => setBtcAssets((assets: string[]) => toggle(assets, asset))}
            >
              {asset.toUpperCase()}
            </button>
          ))}
          <div>Ethereum:</div>
          {allEthAssets.map((asset: string) => (
            <button
              style={{ background: contains(ethAssets, asset) ? 'white' : 'gray' }}
              onClick={() => setEthAssets((assets: string[]) => toggle(assets, asset))}
            >
              {asset.toUpperCase()}
            </button>
          ))}
        </div>
      </main>

      <footer>
        <div>Data updates at midnight, UTC</div>
        <div>Data from CoinMetrics</div>
        <div>
          Created by{' '}
          <a href="https://twitter.com/dmihal" target="twitter">
            David Mihal
          </a>
        </div>
        <div>
          Design help from{' '}
          <a href="https://twitter.com/hey_heey_heeey" target="twitter">
            @heyheeyheeey
          </a>
        </div>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 2rem 0 3rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: auto;
          border-top: 1px solid lightGray;
          text-align: center;
          padding: 2rem 0;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0 0 16px;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
          max-width: 800px;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          margin: 4px 0 20px;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Noto Sans TC', sans-serif;
          background: #eeeeee;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await getData();

  return { props: { data }, revalidate: 60 };
};

export default Home;
