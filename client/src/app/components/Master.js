import React from 'react';
import Title from 'react-title-component';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import spacing from 'material-ui/lib/styles/spacing';
import styleResizable from 'material-ui/lib/mixins/style-resizable';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import {darkWhite, lightWhite, grey900} from 'material-ui/lib/styles/colors';

import FullWidthSection from './FullWidthSection';

const githubButton = (
  <IconButton
    iconClassName="muidocs-icon-custom-github"
    href="https://github.com/callemall/material-ui"
    linkButton={true}
  />
);

const Master = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    location: React.PropTypes.object,
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    styleResizable,
  ],

  getInitialState() {
    return {
      muiTheme: getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    this.setState({
      muiTheme: this.state.muiTheme,
    });
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  },

  getStyles() {
    const styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400,
      },
      content: {
        margin: spacing.desktopGutter,
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
      footer: {
        backgroundColor: grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
        maxWidth: 356,
      },
      iconButton: {
        color: darkWhite,
      },
    };

    if (this.isDeviceSize(styleResizable.statics.Sizes.MEDIUM) ||
        this.isDeviceSize(styleResizable.statics.Sizes.LARGE)) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }

    return styles;
  },

  handleChangeMuiTheme(muiTheme) {
    this.setState({
      muiTheme: muiTheme,
    });
  },

  render() {
    const {
      location,
      children,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const router = this.context.router;
    const styles = this.getStyles();
    const title = 'Green Light';
    //  router.isActive('/home') ? 'Green Light' :
    //  router.isActive('/login') ? 'Green Light' : 'Green Light';
    
    let isLoginPage = router.isActive('/login') ? true : false;

    let docked = false;
    let showMenuIconButton = true;

    /*if (this.isDeviceSize(styleResizable.statics.Sizes.LARGE) && title !== '') {
      docked = true;
      showMenuIconButton = false;
      styles.root.paddingLeft = 256;
      styles.footer.paddingLeft = 256;
    }*/

    return (
      <div>
        <Title render="Green-Light" />
        
       {isLoginPage ? '' : 
        <AppBar
          onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
          title={title}
          zDepth={0}
          iconElementRight={githubButton}
          style={styles.appBar}
          showMenuIconButton={false}
        />
       }
        
        {title !== '' ?
          <div style={prepareStyles(styles.root)}>
            <div style={prepareStyles(styles.content)}>
              {React.cloneElement(children, {
                onChangeMuiTheme: this.handleChangeMuiTheme,
              })}
            </div>
          </div> :
          children
        }
        
        {isLoginPage ? '' : 
        <FullWidthSection style={styles.footer}>
          <p style={prepareStyles(styles.p)}>
            {'Hand crafted with love by the engineers at '}
            <a style={styles.a} href="http://www.call-em-all.com/Careers">
              Call-Em-All
            </a>
            {' and our awesome '}
            <a
              style={prepareStyles(styles.a)}
              href="https://github.com/callemall/material-ui/graphs/contributors"
            >
              contributors
            </a>.
          </p>
          <IconButton
            iconStyle={styles.iconButton}
            iconClassName="muidocs-icon-custom-github"
            href="https://github.com/callemall/material-ui"
            linkButton={true}
          />
        </FullWidthSection>
        }
      </div>
    );
  },
});

export default Master;
