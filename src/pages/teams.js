import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class PostsIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const faqs = data.allMarkdownRemark.edges.sort((item1, item2) => {

      const name1 = item1.node.frontmatter.title;
      const name2 = item2.node.frontmatter.title;
      return name1 > name2 ? 1 : -1;
    });

    return (
      <Layout
        location={this.props.location}
        title={"CODE CAMP 1.0 REGISTERED TEAMS 🤝"}
        siteTitle={siteTitle}
        numberOfParticipants={faqs.length}
      >
        <SEO
          title="teams"
          keywords={[
            `teams`,
            `code camp 1.0`,
            `Iste`,
            `Community`,
          ]}
        />

        {faqs.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div
              key={node.fields.slug}
              style={{
                paddingRight: `${rhythm(3 / 4)}`,
                paddingLeft: `${rhythm(3 / 4)}`,
                marginLeft: `auto`,
                marginRight: `auto`,
                maxWidth: rhythm(24),
              }}
            >
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link to={node.fields.slug}>{title}</Link>
              </h3>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default PostsIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "team" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            type
            priority
          }
        }
      }
    }
  }
`
