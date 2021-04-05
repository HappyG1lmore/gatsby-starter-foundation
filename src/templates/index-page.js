/** @jsx jsx */
import React from "react"
import { jsx } from 'theme-ui'
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightSLine } from "react-icons/ri"
import {RiTelegramFill, RiDiscordFill} from "react-icons/ri";
import {IoIosMail} from "react-icons/io";

import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';


import Layout from "../components/layout"
import BlogListHome from "../components/blog-list-home"
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  console.log(`Hi!!!`)
  const handlePopoverOpen = (event) => {
    console.log(`mouseenter`)
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  console.log(`anchorEl`, anchorEl)

  const { frontmatter, html } = markdownRemark
  const Image = frontmatter.featuredImage
  ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
  : ""
  const open = Boolean(anchorEl);
  const sIcons = Icons.socialIcons.map((icons, index) => {
    return(
      <div key={"social icons" + index}>
        { icons.icon === "telegram" && (
          <>
            <Link
              to={icons.url}
              target="_blank"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <RiTelegramFill/>
            </Link>

          </>
        )}
        { icons.icon === "discord" && (
          <Link
            to={icons.url}
            target="_blank"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <RiDiscordFill/>
          </Link>
        )}
        { icons.icon === "mail" && (
          <>
          <Typography
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
          <Link
            to={icons.url}
            target="_blank"
          >
            <IoIosMail/>
          </Link>
            </Typography>
          <Popover
            id="mouse-over-popover"
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography>I use Popover.</Typography>
          </Popover>
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
