import { useEffect, useState, useMemo } from "react";
import expensiveMathOperation from "./expensiveMathOperation";

export default function Home() {
  const [count, setCount] = useState(35);
  const [left, setLeft] = useState(0);
  // useMemo memoizes expensive function calls so they only are re-evaluated when needed. I put in the [fibonacci sequence][fibonacci] in its recursive style to simulate this. All you need to know is that once you're calling fibonacci with 30+ it gets quite computationally expensive and not something you want to do unnecessarily as it will cause pauses and jank. It will now only call fibonacci if count changes and will just the previous, memoized answer if it hasn't changed.
  const value = useMemo(() => expensiveMathOperation(count), [count]);

  useEffect(() => {
    // If we didn't have the useMemo call, everytime the ball moved it'd unnecessarily recalculate the answer of fibonacci but because we did use useMemo it will only calculate it when count has changed.
    requestAnimationFrame(animate);
    function animate() {
      setLeft(left + 1);
    }
  }, [left]);

  return (
    <div>
      <div
        style={{ left: `${Math.sin(left * 0.05) * 100 + 100}px` }}
        className="ball"
      ></div>
      <h2>
        Count: {count} <button onClick={() => setCount(count + 1)}>+</button>
      </h2>
      <h2>Result of an expensive math computation: {value}</h2>
    </div>
  );
}
