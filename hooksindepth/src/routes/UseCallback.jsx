import { useEffect, useState, useCallback } from "react";
import UseRefComponent from "./UseRef";

export default function Home() {
  const [left, setLeft] = useState(0);
  useEffect(() => {
    requestAnimationFrame(animate);
    function animate() {
      setLeft(left + 1);
    }
  }, [left]);

  // We're using the feature of React called React.memo. This is similar to PureComponent where a component will do a simple check on its props to see if they've changed and if not it will not re-render this component (or its children, which can bite you.) React.memo provides this functionality for function components. Given that, we need to make sure that the function itself given to UseRefComponent is the same function every time. We can use useCallback to make sure that React is handing the exact same (i.e. === and not just ==) to UseRefComponent every time so it passes its React.memo check every single time. Now it'll only re-render if we give it a different parameter.
  const aUsefulCallback = () => {};
  const memoizedCallback = useCallback(aUsefulCallback, []);
  // const memoizedCallback = useMemo(()=>aUsefulCallback, []);

  return (
    <div>
      <div
        style={{ left: `${Math.sin(left * 0.05) * 100 + 100}px` }}
        className="ball"
      ></div>
      <UseRefComponent cb={memoizedCallback} />
    </div>
  );
}
