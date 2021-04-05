/** @jsx jsx */
import { jsx } from 'theme-ui'

const Header = ({children}) => (
  <header
    className="site-header"
    sx={{
      bg: 'primary'
    }}
  >
    <div className="site-header-container">
    {children}
    </div>
  </header>
)

export default Header