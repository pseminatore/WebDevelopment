import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import stock_good from './stock_good.png'
import stock_verygood from './stock_verygood.png'
import stock_bad from './stock_bad.png'
import stock_verybad from './stock_verybad.png'
import chart from './chart.png'


class Container extends React.Component {
    render(){
        return (
            <div className="Container">
                <div className="title">
                    <h1>StockStop</h1>
                    <h3><em>The World's Definitive Source for Trading Information</em></h3>
                    <div className="credit">Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </div>
                <StockPriceDisplay />
                <StockTrendDisplay />
                <StockBuyDisplay />
            </div>
        );
    }
}
class StockPriceFinder extends React.Component {
    render(){
        return (
            <div className="input-section">
                <button className="findStock" onClick={findStockPrice}>Find Stock!</button>
                <input type="text" name="stockName"></input>
            </div>
        );
    }
}

class StockTrendFinder extends React.Component {
    render(){
        return (
            <div className="input-section">
                <button className="findStock" onClick={findStockTrend}>Find Stock!</button>
                <input type="text" name="stockName"></input>
            </div>
        );
    }
}

class StockBuyFinder extends React.Component {
    render(){
        return (
            <div className="input-section">
                <button className="findStock" onClick={findStockBuy}>Find Stock!</button>
                <input type="text" name="stockName"></input>
            </div>
        );
    }
}

class StockPriceDisplay extends React.Component {
    render(){
        return (
            <div className="stockPrice">
                <h1>Find a Stock Price!</h1>
                <StockPriceFinder />
                <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
                <div className="companyName"></div>
                <div className="displayPrice"></div>
                <div className="displayHigh"></div>
                <div className="displayLow"></div>
            </div>
        );
    }
}

class StockTrendDisplay extends React.Component {
    render(){
        return (
            <div className="stockTrend">
                <h1>Stock Trend Details!</h1>
                <StockTrendFinder />
                <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
                <div className="companyName"></div>
                <div className="shortTrend"></div>
                <div className="extendedTrend"></div>
                <div className="yearToNow"></div>
            </div>
        );
    }
}

class StockBuyDisplay extends React.Component {
    render(){
        return (
            <div className="stockBuy">
                <h1>Looking to Purchase a Stock? Get Our Expert Opinion Here!</h1>
                <StockBuyFinder />
                <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
                <div className="companyName"></div>
                <div className="verdict"></div>
                <div className="rationale"></div>
                <div className="image"></div>
            </div>
        );
    }
}


function findStockPrice() {
    let stock = document.getElementsByName("stockName")[0].value
    let request = new XMLHttpRequest();
    request.open('GET', `https://cloud.iexapis.com/stable/stock/${stock}/quote?token=pk_3866600af5c0418190a06b2ee48783fb`, true);
    request.onload = function() {
        let data = JSON.parse(this.response);
        if (request.status == 200){
                let companyName = document.getElementsByClassName("companyName")[0];
                let displayPrice = document.getElementsByClassName("displayPrice")[0];
                let displayHigh = document.getElementsByClassName("displayHigh")[0];
                let displayLow = document.getElementsByClassName("displayLow")[0];
                companyName.innerHTML = `Company: ${data.companyName}`;
                displayPrice.innerHTML = `${data.symbol}: ${data.latestPrice}`;
                if (data.high === null){
                    displayHigh.innerHTML = `Today's High Price: Waiting for Market to Close...`;
                    displayLow.innerHTML = `Today's Low Price: Waiting for Market to Close...`;
                }
                else {
                    displayHigh.innerHTML = `Today's High Price: ${data.high}`;
                    displayLow.innerHTML = `Today's Low Price: ${data.low}`;
                }
                
                console.log(data);
        }
        else {
            console.log("Bad Request");
        }
    }
    request.send();
}

function findStockTrend() {
    let stock = document.getElementsByName("stockName")[1].value
    let request = new XMLHttpRequest();
    request.open('GET', `https://cloud.iexapis.com/stable/stock/${stock}/quote?token=pk_3866600af5c0418190a06b2ee48783fb`, true);
    request.onload = function() {
        let data = JSON.parse(this.response);
        if (request.status == 200){
                let companyName = document.getElementsByClassName("companyName")[1];
                let shortTrend = document.getElementsByClassName("shortTrend")[0];
                let extendedTrend = document.getElementsByClassName("extendedTrend")[0];
                let yearToNow = document.getElementsByClassName("yearToNow")[0];

                companyName.innerHTML = `Company: ${data.companyName}`;
                shortTrend.innerHTML = `Short-Term Trend: ${data.changePercent}%`;
                if (data.extendedChangePercent === null){
                    extendedTrend.innerHTML = `Long-Term Trend: Waiting for Market to Close...`;
                }
                else {
                    extendedTrend.innerHTML = `Long-Term Trend: ${data.extendedChangePercent}%`;
                }
                yearToNow.innerHTML = `Year-to-date Change: ${data.ytdChange} units`;
        }
        else {
            console.log("Bad Request");
        }
    }
    request.send();
}

function findStockBuy() {
    let stock = document.getElementsByName("stockName")[2].value
    let request = new XMLHttpRequest();
    request.open('GET', `https://cloud.iexapis.com/stable/stock/${stock}/quote?token=pk_3866600af5c0418190a06b2ee48783fb`, true);
    request.onload = function() {
        let data = JSON.parse(this.response);
        if (request.status == 200){
                let companyName = document.getElementsByClassName("companyName")[2];
                let verdict = document.getElementsByClassName("verdict")[0];
                let rationale = document.getElementsByClassName("rationale")[0];
                let image = document.getElementsByClassName("image")[0];

                let changePercent = data.changePercent;
                let ytdChange = data.ytdChange;
                let dailyTrend = data.change;
                let high = data.high;
                let low = data.low;
                let price = data.latestPrice;
                let extendedChangePercent = data.extendedChangePercent;
                let companyNameText = data.companyName;

                let prediction = shouldIBuy(changePercent, ytdChange, dailyTrend, high, low, price, extendedChangePercent);

                if (prediction === 1){
                    companyName.innerHTML = companyNameText;
                    verdict.innerHTML = `You should definitely buy ${companyNameText}'s stock!`
                    rationale.innerHTML = "Business is booming! Based on our advanced financial analysis algorithm, we have determined that the time to buy is now.  All signs point to money!"
                    image.innerHTML = `<img src=${stock_verygood}></img>`;
                }
                else if (prediction === 2){
                    companyName.innerHTML = companyNameText;
                    verdict.innerHTML = `You should probably buy ${companyNameText}'s stock.`
                    rationale.innerHTML = "If you are confident in this company, pull the trigger! They are trending upwards and the stock price is cheaper than usual!"
                    image.innerHTML = `<img src=${stock_good}></img>`;
                }
                else if (prediction === 3){
                    companyName.innerHTML = companyNameText;
                    verdict.innerHTML = `We probably wouldn't buy ${companyNameText}'s stock.`
                    rationale.innerHTML = "It seems like they have been trending poorly all year.  Unless you have a GREAT reason to, it just doesn't seem worth it."
                    image.innerHTML = `<img src=${stock_bad}></img>`;
                }
                else if (prediction === 4){
                    companyName.innerHTML = companyNameText;
                    verdict.innerHTML = `DO NOT BUY ${companyNameText}'s STOCK!!`
                    rationale.innerHTML = "This stock is tanking.  Don't even think about it.  Seriously."
                    image.innerHTML = `<img src=${stock_verybad}></img>`;
                }
                else{
                    companyName.innerHTML = companyNameText;
                    verdict.innerHTML = `After intense deliberation, we were unable to agree on a verdict for ${companyNameText}'s stock.  Follow your gut!`
                    rationale.innerHTML = "Some of our analysts like this stock, some don't.  Either way it was too close to call.  This one is up to you!"
                    image.innerHTML = `<img src=${chart}></img>`;
                }
                
        }
        else {
            console.log("Bad Request");
        }
    }
    request.send();
}

function shouldIBuy(changePercent, ytdChange, dailyTrend, high, low, price, extendedChangePercent){
    if (extendedChangePercent === null){
        if((ytdChange > 0) && (changePercent > 0)){
        return 1;
        }
    }
    else{
        if((ytdChange > 0) && (extendedChangePercent > 0) && (price < (high - (high-low)/2))){
        return 1;
        }
    }
    if ((ytdChange > 0) && (changePercent < 0)){
        return 2;
    }
    if ((ytdChange < 0) && dailyTrend < 0){
        return 3;
    }
    if ((ytdChange < 0) && dailyTrend > 0){
        return 4;
    }
    else{
        return 5;
    }
}

// ========================================

ReactDOM.render(
  <Container />,
  document.getElementById('root')
);


