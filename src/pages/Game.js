
        {/* 
        -GAME ID 
        -map number of players alloted in game creation, showing with "player #" unless a user joined the game, then replace with username.
        -Stock Price List from S&P 500
          -Name
          -Price
          -Trending
          -Field for Amt to buy
          -Dollar value of Amt to buy, updating based on what is in amt to buy field
          -Confirm Button to add to Portfolio
        -Total Portfolio
        -Max Budget
        -Ready Button
        -Start Game Button, useable by host, or user with position 0 in players array.
        */}


        import React, { useState } from 'react';
        import StockPicker from './StockPicker';
        import Timer from './Timer';
        import Scoreboard from './Scoreboard';
        
        const SP500_STOCKS = [
          { symbol: 'AAPL', name: 'Apple Inc.' },
          { symbol: 'MSFT', name: 'Microsoft Corporation' },
          { symbol: 'GOOG', name: 'Alphabet Inc.' },
          // ... more S&P 500 stocks ...
        ];
        
        const GAME_DURATION_SECONDS = 60; // Change this to adjust game length
        const STARTING_BUDGET = 10000; // Change this to adjust starting budget
        
        function Game() {
          const [budget, setBudget] = useState(STARTING_BUDGET);
          const [selectedStocks, setSelectedStocks] = useState([]);
          const [gameStartTime, setGameStartTime] = useState(null);
        
          const handleStockSelection = (selectedStock) => {
            const newBudget = budget - selectedStock.price;
            if (newBudget >= 0) {
              setBudget(newBudget);
              setSelectedStocks((prevSelectedStocks) => [...prevSelectedStocks, selectedStock]);
            } else {
              alert('Not enough budget!');
            }
          };
        
          const handleGameStart = () => {
            setGameStartTime(Date.now());
          };
        
          const calculateScore = () => {
            const totalRevenue = selectedStocks.reduce((sum, stock) => sum + stock.revenue, 0);
            return totalRevenue;
          };
        
          const renderStockPicker = () => {
            if (selectedStocks.length < 7) {
              return <StockPicker stocks={SP500_STOCKS} onStockSelected={handleStockSelection} />;
            } else {
              return null;
            }
          };
        
          const renderGameplay = () => {
            if (gameStartTime !== null) {
              const timeRemaining = GAME_DURATION_SECONDS - Math.floor((Date.now() - gameStartTime) / 1000);
              if (timeRemaining > 0) {
                return (
                  <div>
                    <Timer secondsRemaining={timeRemaining} onTimerExpired={() => alert('Time up!')} />
                    <Scoreboard score={calculateScore()} />
                  </div>
                );
              } else {
                return (
                  <div>
                    <h1>Game Over</h1>
                    <Scoreboard score={calculateScore()} />
                  </div>
                );
              }
            } else {
              return <button onClick={handleGameStart}>Start Game</button>;
            }
          };
        
          return (
            <div>
              <h1>Stock Trading Game</h1>
              <p>Budget: {budget}</p>
              {renderStockPicker()}
              {renderGameplay()}
            </div>
          );
        }
        
        export default Game;