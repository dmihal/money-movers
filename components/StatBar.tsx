import React from 'react';
import Numeral from 'numeral';
import ethLogo from './eth.svg';
import btcLogo from './btc.svg';

const StatBar: React.FC = ({ btc, eth }) => {
  return (
    <div className="statbar">
      <div className="stat" style={{ backgroundImage: `url(${btcLogo})` }}>
        <div className="value">
          ${Numeral(btc).format('0.[000]a')}
        </div>
        <div>Bitcoin</div>
      </div>
      <div className="stat" style={{ backgroundImage: `url(${ethLogo})` }}>
        <div className="value">
          ${Numeral(eth).format('0.[000]a')}
        </div>
        <div>Ethereum</div>
      </div>

      <style jsx>{`
        .statbar {
          display: flex;
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
        .value {
          font-size: 24px;
        }
      `}</style>
    </div>
  );
}

export default StatBar;
