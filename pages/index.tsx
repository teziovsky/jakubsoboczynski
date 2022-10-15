import Meta from "components/seo-meta";
import type { NextPage } from "next";
import Layout from "../layouts/layout";
import { api } from "../plugins";
import { ISocialLinksFields, TSocialLink } from "../types/contentful";

type Props = {
  socialLinks: TSocialLink[];
};

const Home: NextPage<Props> = ({ socialLinks }: Props) => {
  return (
    <>
      <Meta title="Hello!" description="My own page." />
      <Layout>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        {socialLinks?.map((socialLink) => (
          <div>
            <a key={socialLink.title} href={socialLink.url}>
              {socialLink.title}
            </a>
            <img src={socialLink.icon} alt={socialLink.title} />
          </div>
        ))}
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  const entries = await api.getEntries<ISocialLinksFields>({
    content_type: "socialLinks",
  });

  const socialLinks = entries.items.map((item) => {
    return {
      id: item.sys.id,
      ...item.fields,
      icon: `https:${item.fields.icon.fields.file.url}`,
    };
  });

  return {
    props: {
      socialLinks,
    },
  };
};

export default Home;
