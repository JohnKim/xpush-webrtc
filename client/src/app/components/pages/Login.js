import React from 'react';
import Title from 'react-title-component';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';
import FontIcon from 'material-ui/lib/font-icon';

const styles = {
  button: {
    margin: 12,
  },
};


const LoginPage = () => (
  <div style={{display: 'flex', justifyContent: 'center'}}>
    <Title render={(previousTitle) => `Login - ${previousTitle}`} />
    <Card style={{maxWidth: 600}} >
        <CardHeader
        title="John Kim"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        avatar="http://lorempixel.com/100/100/people/"
        />
        <CardMedia
        overlay={<CardTitle title="Overlay title" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio." />}
        >
        <img src="http://lorempixel.com/600/337/people/" />
        </CardMedia>
        <CardTitle title="GREEN LIGHT" subtitle="RANDOM VIDEO CHAT SERVICE" />
        <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
        <RaisedButton
            label="Login with FACEBOOK"
            linkButton={true}
            href="https://github.com/callemall/material-ui"
            secondary={true}
            style={styles.button}
            />
        </CardActions>
    </Card>
  </div>
);

export default LoginPage;
