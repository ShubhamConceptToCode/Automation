import React, { useContext } from 'react';
import { Nav, NavItem, NavLink, UncontrolledTooltip } from 'reactstrap';
import ProfileDropdown from './ProfileDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import AppContext from '../../context/Context';
import classNames from 'classnames';
import { navbarBreakPoint } from '../../config';

const TopNavRightSideNavItem = () => {
  const { isTopNav, isCombo } = useContext(AppContext);
  return (
    <Nav navbar className="navbar-nav-icons ml-auto flex-row align-items-center">
      <NavItem>
      </NavItem>
      {(isCombo || isTopNav) && (
        <NavItem className={classNames(`p-2 px-lg-0 cursor-pointer`, { [`d-${navbarBreakPoint}-none`]: isCombo })}>
          <NavLink tag={Link} to="/changelog" id="changelog">
            <FontAwesomeIcon icon="code-branch" transform="right-6 grow-4" />
          </NavLink>
          <UncontrolledTooltip autohide={false} placement="left" target="changelog">
            Changelog
          </UncontrolledTooltip>
        </NavItem>
      )}
      <ProfileDropdown />
    </Nav>
  );
};

export default TopNavRightSideNavItem;
