import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'


const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },

    content: {
        padding: 25,
        objectFit: 'cover'
    },
    image: {
        minWidth: 200
    },
    avatar: {
        minWidth: 200,
        minHeight: 200,
        border: "2px solid #90caf9"
    }
}

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { classes, scream: { body, commentCount, createdAt, likeCount, userHandle, userImage} } = this.props
        return (
            <Card className={classes.card} >
                {/* <CardMedia image={userImage} className={classes.image} /> */}
                <Avatar src={userImage}  className={classes.avatar} />
                <CardContent className={classes.content} >
                    <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`} > {userHandle} </Typography>
                    <Typography variant="body2" color= "textSecondary"> {dayjs(createdAt).fromNow()} </Typography>
                    <Typography variant="body1" color="textPrimary" > { body } </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Scream)
