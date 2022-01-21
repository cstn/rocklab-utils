/**
 * @fileOverview infinite scroller
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getDisplayName from '../utils/getDisplayName';

function withInfiniteScroller(WrappedComponent, options = { offset: 0 }) {
  class WithInfiniteScroller extends Component {
    constructor(props) {
      super(props);

      this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
      const { hasMore, onMore } = this.props;
      const { offset } = options;

      const { scrollHeight } = document.body;
      const height = window.scrollY + window.innerHeight;
      const isAtBottom = height >= scrollHeight - offset;

      if (isAtBottom && hasMore) {
        onMore();
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithInfiniteScroller.displayName = `withInfiniteScroller(${getDisplayName(WrappedComponent)})`;
  WithInfiniteScroller.propTypes = {
    isLoading: PropTypes.bool,
    hasMore: PropTypes.bool,
    onMore: PropTypes.func.isRequired,
  };

  WithInfiniteScroller.defaultProps = {
    isLoading: false,
    hasMore: true,
  };

  return WithInfiniteScroller;
}

export default withInfiniteScroller;
