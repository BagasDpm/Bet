import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [money, setMoney] = useState(10000)
  const [bet, setBet] = useState(500)

  const symbols = ['🍒', '🍊', '🍇', '🍉', '🍓', '🍎', '🍍']
  const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)]
  const [slots, setSlots] = useState([getRandomSymbol(), getRandomSymbol(), getRandomSymbol()])
  const [isSpinning, setIsSpinning] = useState(false)

  useEffect(() => {
    if (isSpinning) {
      const intervalId = setInterval(() => {
        setSlots([getRandomSymbol(), getRandomSymbol(), getRandomSymbol()])
      }, 100)

      setTimeout(() => {
        clearInterval(intervalId)

        if (slots[0] === slots[1] && slots[1] === slots[2]) {
          setMoney(money + bet * 2);
        }

        setIsSpinning(false)
      }, 3000)
    }
  }, [isSpinning]);

  const onSpin = () => {
    if(money == 0) {
      window.alert("No have money!")
    }
    else if (money > bet || money == bet) {
      setIsSpinning(true)
      setMoney(money - bet)
    }
    else {
      window.alert("No have money!")
    }
  }

  return (
    <div className="h-screen w-screen overflow-none bg-purple-800 flex flex-col items-center justify-center">

      <div className={"flex transition-all " + (isSpinning ? "spin-animation" : "")}>
        {slots.map((symbol, index) => (
          <div key={index} className="text-5xl mx-4">
            {symbol}
          </div>
        ))}
      </div>

      <span className="text-white text-3xl font-semibold mt-10">Balance: ${money}</span>

      <div className="flex flex-row gap-3 items-center justify-center mt-3">
        <div>
          <span className="text-white text-2xl font-bold mr-3">BET</span>
          <input className={"border rounded-md p-1 text-lg font-semibold focus:outline-none w-20 " + (isSpinning ? "bg-purple-950 text-purple-800" : "bg-black text-white")} type="number" disabled={isSpinning} value={bet} onChange={(e) => setBet(e.target.value)} />
        </div>
        <button className={"px-8 py-4 rounded-full text-3xl font-semibold " + (isSpinning ? "bg-purple-950 text-purple-800" : "bg-black text-white")} onClick={onSpin} disabled={isSpinning}>SPIN</button>
      </div>

      </div>
  )
}

export default App;
