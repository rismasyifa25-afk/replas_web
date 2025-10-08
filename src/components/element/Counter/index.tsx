import { useState } from "react";


function Counter() {
  const useCounter = (initial: number = 0) => {
    const [count, setCount] = useState(initial);

    const increment = () => setCount(prev => prev + 1);
    const decrement = () => setCount(prev => (prev > 0 ? prev - 1 : prev));

    return { count, increment, decrement };
  };

  const { count, increment, decrement } = useCounter();

  return (
    <div className="border border-red-500 rounded-full">
        <div className="flex items-center mx-2">
            <button onClick={decrement}> - </button>
            <p className="mx-2 mt-1">{count}</p>
            <button onClick={increment}> + </button>
        </div>
    </div>
  );
}

export default Counter;
