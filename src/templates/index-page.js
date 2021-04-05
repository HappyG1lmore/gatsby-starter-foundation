/** @jsx jsx */
import React from "react"
import { jsx } from 'theme-ui'
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightSLine } from "react-icons/ri"
import {RiTelegramFill, RiDiscordFill} from "react-icons/ri";
import {IoIosMail} from "react-icons/io";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Layout from "../components/layout"
import BlogListHome from "../components/blog-list-home"
import SocialWithTooltip from "../components/social-with-tooltip"
import SEO from "../components/seo"
import Icons from "../util/socialmedia.json"

export const pageQuery = graphql`
  query HomeQuery($id: String!){
		markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        tagline
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              width: 585
              height: 439
            )
          }
        }
        cta {
          ctaText
          ctaLink
        }
      }
    }
    posts : allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: 6
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  layout: FIXED
                  width: 345
                  height: 260
                )
              }
            }
          }
        }
      }
    }
  }
`

const HomePage = ({ data }) => {
  const { markdownRemark, posts } = data // data.markdownRemark holds your post data

  const [isMailAlertOpen, setIsMailAlertOpen] = React.useState(false);

  const { frontmatter, html } = markdownRemark
  const Image = frontmatter.featuredImage
  ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
  : ""

  const sIcons = Icons.socialIcons.map((icons, index) => {
    return(
      <div key={"social icons" + index}>
        { icons.icon === "telegram" && (
          <SocialWithTooltip text={icons.tooltip}>
            <a
              href={icons.url}
              target="_blank"
              rel="noreferrer"
            >
              <RiTelegramFill/>
            </a>
          </SocialWithTooltip>
        )}
        { icons.icon === "discord" && (
          <SocialWithTooltip text={icons.tooltip}>
            <a
              href={icons.url}
              target="_blank"
              rel="noreferrer"
            >
              <RiDiscordFill/>
            </a>
          </SocialWithTooltip>
        )}
        { icons.icon === "mail" && (
          <>
            <SocialWithTooltip text={icons.tooltip}>
              <a
                href=''
                onClick={(evt) => {
                  evt.preventDefault();
                  navigator.clipboard.writeText(icons.url).then(() => {
                    setIsMailAlertOpen(true)
                  })
                }}
              >
                <IoIosMail />
              </a>
            </SocialWithTooltip>
            <Snackbar
              open={isMailAlertOpen}
              autoHideDuration={6000}
              onClose={(event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }
                setIsMailAlertOpen(false);
              }}
            >
              <MuiAlert
                elevation={6}
                severity="info"
                variant="filled"
              >
                Адрес почты скопирован в буфер обмена.
              </MuiAlert>
            </Snackbar>
          </>
        )}
      </div>
    )
  })

	return (
		<Layout>
      <SEO/>
      <div className="home-banner grids col-1 sm-2">
        <div>
          <h1 className="title">{frontmatter.title}</h1>
          <p
            className="tagline"
            sx={{
              color: 'muted'
            }}
          >
            {frontmatter.tagline}
          </p>
          <div className="description" dangerouslySetInnerHTML={{__html: html}}/>
          <Link
            to={frontmatter.cta.ctaLink}
            className="button"
            sx={{
              variant: 'links.button'
            }}
          >
            {frontmatter.cta.ctaText}<span className="icon -right"><RiArrowRightSLine/></span>
          </Link>
          <div  className="social-icons" sx={indexStyles.socialIcons}>
            {sIcons}
          </div>
        </div>
        <div>
          {Image ? (
            <GatsbyImage
              image={Image}
              alt={frontmatter.title + " - Featured image"}
              className="featured-image"
            />
          ) : ""}
        </div>
      </div>
      <BlogListHome data={posts} />
		</Layout>
	)
}

export default HomePage

const indexStyles = {
  socialIcons: {
    "a":{
      color: "socialIcons",
      ":hover":{
        color:"socialIconsHover",
      }
    }
  }
}
