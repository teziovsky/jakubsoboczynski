import Footer from "components/footer";
import Header from "components/header";
import SocialLinks from "components/social-links";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <SocialLinks />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
