import React from 'react';
import Numeral from 'numeral';
import ethLogo from './eth.svg';
import btcLogo from './btc.svg';
import bchLogo from './bch.svg';
import xrpLogo from './xrp.svg';

interface StatBarProps {
  btc: number;
  eth: number;
  bch: number | null;
  xrp: number | null;
}

const StatBar: React.FC<StatBarProps> = ({ btc, eth, bch, xrp }) => {
  return (
    <div className="statbar">
      <div className="stat" style={{ backgroundImage: `url(${ethLogo})` }}>
        <div className="value">
          ${Numeral(eth).format('0.[000]a')}
          <span className="small">/day</span>
        </div>
        <div>Ethereum</div>
      </div>
      <div className="stat" style={{ backgroundImage: `url(${btcLogo})` }}>
        <div className="value">
          ${Numeral(btc).format('0.[000]a')}
          <span className="small">/day</span>
        </div>
        <div>Bitcoin</div>
      </div>

      {bch && (
        <div className="stat" style={{ backgroundImage: `url(${bchLogo})` }}>
          <div className="value">
            ${Numeral(bch).format('0.[000]a')}
            <span className="small">/day</span>
          </div>
          <div>Bitcoin Cash</div>
        </div>
      )}

      {xrp && (
        <div className="stat" style={{ backgroundImage: `url(${xrpLogo})` }}>
          <div className="value">
            ${Numeral(xrp).format('0.[000]a')}
            <span className="small">/day</span>
          </div>
          <div>Ripple</div>
        </div>
      )}

      <style jsx>{`
        .statbar {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .stat {
          margin: 10px;
          border: solid 1px #999999;
          padding: 10px 10px 10px 40px;
          border-radius: 10px;
          background-repeat: no-repeat;
          background-size: 24px;
          background-position: 10px center;
        }
        .small {
          font-size: 16px;
        }
        .value {
          font-size: 24px;
        }
      `}</style>
    </div>
  );
}

export default StatBar;
