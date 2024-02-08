// This page is the blog post template

import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const BlogPost = ({ data, children }) => {
  const image = getImage(data.mdx.frontmatter.hero_image);
  const date = data.mdx.frontmatter.date;
  const alt = data.mdx.frontmatter.hero_image_alt;
  const creditLink = data.mdx.frontmatter.hero_image_credit_link;
  const creditText = data.mdx.frontmatter.hero_image_credit_text;

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>Posted: {date}</p>
      <GatsbyImage image={image} alt={alt} />
      {/* Pro Tip: Since the credit link goes to an external page (in other words, one that’s not part of your site), you can use the <a> HTML tag instead of the Gatsby Link component. */}
      <p>
        {/* Prettier seems to not need this, but good FYI for the future: 
          Syntax Hint: You might have noticed that there’s a {" "} after the “Photo Credit:” text <p> tag. That’s to make sure that a space gets rendered between the colon (:) and the link text. Try removing the {" "} and see what happens. The paragraph text should end up being “Photo Credit:Author”. */}
        Photo Credit: <a href={creditLink}>{creditText}</a>
      </p>
      <p>{children}</p>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />;

export default BlogPost;
