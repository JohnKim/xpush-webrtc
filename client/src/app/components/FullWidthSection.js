import React from 'react';
import ClearFix from 'material-ui/lib/ClearFix';
import spacing from 'material-ui/lib/styles/spacing';
import styleResizable from 'material-ui/lib/mixins/style-resizable';

const desktopGutter = spacing.desktopGutter;

const FullWidthSection = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    contentStyle: React.PropTypes.object,
    contentType: React.PropTypes.string,
    style: React.PropTypes.object,
    useContent: React.PropTypes.bool,
  },

  mixins: [
    styleResizable,
  ],

  getDefaultProps() {
    return {
      useContent: false,
      contentType: 'div',
    };
  },

  getStyles() {
    return {
      root: {
        padding: desktopGutter,
        boxSizing: 'border-box',
      },
      content: {
        maxWidth: 1200,
        margin: '0 auto',
      },
      rootWhenSmall: {
        paddingTop: desktopGutter * 2,
        paddingBottom: desktopGutter * 2,
      },
      rootWhenLarge: {
        paddingTop: desktopGutter * 3,
        paddingBottom: desktopGutter * 3,
      },
    };
  },

  render() {
      
    const {
      style,
      useContent,
      contentType,
      contentStyle,
    } = this.props;

    const styles = this.getStyles();

    let content;
    if (useContent) {
      content =
        React.createElement(
          contentType,
          {style: Object.assign(styles.content, contentStyle)},
          this.props.children
        );
    } else {
      content = this.props.children;
    }

    return (
      <ClearFix
        style={Object.assign(
          styles.root,
          style,
          this.isDeviceSize(styleResizable.statics.Sizes.SMALL) && styles.rootWhenSmall,
          this.isDeviceSize(styleResizable.statics.Sizes.LARGE) && styles.rootWhenLarge)}
      >
        {content}
      </ClearFix>
    );
  },
});

export default FullWidthSection;