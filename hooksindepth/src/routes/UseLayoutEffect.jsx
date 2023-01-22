// useLayoutEffect is almost the same as useEffect except that it's synchronous to render as opposed to scheduled like useEffect is. If you're migrating from a class component to a hooks-using function component, this can be helpful too because useLayoutEffect runs at the same time as componentDidMount and componentDidUpdate whereas useEffect is scheduled after.
// The only time you should be using useLayoutEffect is to measure DOM nodes for things like animations. In the example, I measure the textarea after every time you click on it (the onClick is to force a re-render.) This means you're running render twice but it's also necessary to be able to capture the correct measurments.
import { useState, useLayoutEffect, useRef } from "react";

const LayoutEffectComponent = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const el = useRef();

  // If you make the useLayoutEffect into a useEffect it will have a janky re-render where it'll flash before it renders correctly. This is exactly why we need useLayoutEffect.
  useLayoutEffect(() => {
    setWidth(el.current.clientWidth);
    setHeight(el.current.clientHeight);
  });

  return (
    <div>
      <h2>textarea width: {width}px</h2>
      <h2>textarea height: {height}px</h2>
      <textarea
        onClick={() => {
          // This is basically saying "force update"
          setWidth(0);
        }}
        ref={el}
      />
    </div>
  );
};

export default LayoutEffectComponent;
