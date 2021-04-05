/** @jsx jsx */
import React from "react"
import { jsx } from 'theme-ui'
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';


const SocialWithTooltip = (props) => {
  const { children, text = '' } = props;

  return (
    <Tooltip arrow title={text} TransitionComponent={Zoom}>
      {children}
    </Tooltip>
  )
}

export default SocialWithTooltip
