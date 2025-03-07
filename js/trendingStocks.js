const SYMBOLS_API_BASE_URL =
    "https://api.frontendexpert.io/api/fe/stock-symbols";
const MARKET_CAPS_API_BASE_URL =
    "https://api.frontendexpert.io/api/fe/stock-market-caps";
const PRICES_API_BASE_URL = "https://api.frontendexpert.io/api/fe/stock-prices";

async function trendingStocks(n) {
    const [symbolsResponse, marketCapsResponse] = await Promise.all([
        fetch(SYMBOLS_API_BASE_URL),
        fetch(MARKET_CAPS_API_BASE_URL),
    ]);

    const [symbols, marketCaps] = await Promise.all([
        symbolsResponse.json(),
        marketCapsResponse.json(),
    ]);

    const requestedSymbols = marketCaps
        .sort((stockA, stockB) => {
            return stockA["market-cap"] - stockB["market-cap"];
        })
        .slice(0, n)
        .map((marketCapsObj) => marketCapsObj.symbol);

    const priceUrl = new URL(PRICES_API_BASE_URL);
    priceUrl.searchParams.set("symbols", JSON.stringify(requestedSymbols));
    const pricesResponse = await fetch(priceUrl);
    const prices = await pricesResponse.json();

    const namesAndMarketCapsBySymbol = getNamesAndMarketCapsBySymbol(
        symbols,
        marketCaps
    );

    const stockData = prices.map(({symbol, ...rest})=>({
        symbol,
        ...namesAndMarketCapsBySymbol[Symbol],
        ...rest
    }))
    return stockData
}

function getNamesAndMarketCapsBySymbol(symbols, marketCaps) {
    const namesAndMarketCapsBySymbol = {};
    symbols.forEach(({ symbol, name }) => {
        namesAndMarketCapsBySymbol[symbol] = { name };
    });

    marketCaps.forEach(({ symbol, "market-cap": marketCaps }) => {
        namesAndMarketCapsBySymbol[symbol]["market-cap"] = marketCaps;
    });

    return namesAndMarketCapsBySymbol;

}