import { ReactNode } from "react";

import "./layaut.css";

type LayautProps = {
  children: ReactNode;
};
const Layaut = ({ children }: LayautProps) => {
  return (
    <div className="layout">
      <div className="layout__img-container">
        {/* <img src={desktopBgImageLight} alt="" /> */}
      </div>
      <div className="layout__content">{children}</div>
    </div>
  );
};

export default Layaut;
