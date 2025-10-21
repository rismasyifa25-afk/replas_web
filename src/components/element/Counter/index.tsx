interface CounterProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

function Counter({ quantity, setQuantity }: CounterProps) {
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="border border-red-500 rounded-full">
        <div className="flex items-center mx-2">
            <button onClick={decrement}> - </button>
            <p className="mx-2 mt-1">{quantity}</p>
            <button onClick={increment}> + </button>
        </div>
    </div>
  );
}

export default Counter;
