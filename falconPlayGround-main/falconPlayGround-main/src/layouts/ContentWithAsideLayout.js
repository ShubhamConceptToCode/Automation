import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap';

const ContentWithAsideLayout = ({ banner, aside, isStickyAside, children }) => {
  return (
    <Fragment>
      {banner}
      <Row noGutters>
        <Col  className={classNames('pr-lg-2', { 'mb-3': !isStickyAside })}>
          {children}
        </Col>
      </Row>
    </Fragment>
  );
};

ContentWithAsideLayout.propTypes = {
  banner: PropTypes.element,
  footer: PropTypes.element,
  isStickyAside: PropTypes.bool,
  children: PropTypes.node
};

ContentWithAsideLayout.defaultProps = { isStickyAside: true };

export default ContentWithAsideLayout;
