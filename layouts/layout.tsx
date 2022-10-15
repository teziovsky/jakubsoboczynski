import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <header></header>
      <main className="container">{children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
