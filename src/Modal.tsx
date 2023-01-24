// Portal. This will mount a div and mount inside of the portal whenever the Modal is rendered and then remove itself whenever it's unrendered.
import { useEffect, useRef, MutableRefObject, ReactElement } from "react";
import { createPortal } from "react-dom";

// Children will be the things React renders like jsx
const Modal = ({ children }: { children: ReactElement }) => {
  // We use Ref to have same exact "div" in every re-render
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !elRef.current) {
      return;
    }
    modalRoot.appendChild(elRef.current);

    // componentWillUnmount
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
