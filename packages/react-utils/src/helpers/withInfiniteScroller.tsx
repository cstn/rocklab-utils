/**
 * @fileOverview infinite scroller
 */

import React, { Component, ComponentClass, ComponentType } from 'react';

interface Props {
  hasMore: boolean;
  onMore: () => void;
}

function withInfiniteScroller<T extends Props>(
  WrappedComponent: ComponentType<T>,
  options = { offset: 0 }
): ComponentClass<T> {
  class WithInfiniteScroller extends Component<Props> {
    constructor(props: T) {
      super(props);

      this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      // eslint-disable-next-line @typescript-eslint/unbound-method
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
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <WrappedComponent {...(this.props as T)} />;
    }
  }

  return WithInfiniteScroller as ComponentClass<T>;
}

export default withInfiniteScroller;
