import Footer from "components/footer";
import Header from "components/header";
import SocialLinks from "components/social-links";
import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Layout = ({ className, children }: Props) => {
  return (
    <>
      <Header />
      <SocialLinks />
      <main className={className}>{children}</main>
      <Footer className="pt-12 mb-8 lg:pt-0" />
      <SocialLinks className="flex items-center justify-center pb-12 gap-x-8 lg:hidden" />
    </>
  );
};

export default Layout;
