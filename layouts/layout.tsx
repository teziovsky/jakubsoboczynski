import Footer from "components/footer";
import Header from "components/header";
import SocialLinks from "components/social-links";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="px-4 md:px-12 container">
      <Header />
      <SocialLinks />
      <main>{children}</main>
      {/*If > md = hide classes*/}
      <Footer className="pt-12 mb-4" />
      {/*If > md = hide icons*/}
      <SocialLinks className="flex justify-center items-center gap-x-8 pb-12" />
    </div>
  );
};

export default Layout;
