import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/network.png';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

// form Stuff
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// mui stuff
import Grid from '@material-ui/core/Grid';

const styles = {
    form: {
        textAlign: 'center'
    },
    picture: {
        maxHeight: 50,
        margin: '0px auto 20px auto'
    },
    progress: {
       position: 'center'
    }
}

class login extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        })
    
        axios.post('/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            console.log(res.data)
            this.setState({
                loading: false
            });
            this.props.history.push('/');
        })
        .catch(err => {
            this.setState({
                errors: err.response.data,
                loading: false
            })
            console.log(this.state.errors)
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        const wrongEmail = errors.error ? "Wrong email, please try again" : "";
        return (
            <Grid container className={classes.form}>
                <Grid item xs/>
                <Grid item xs>
                    <img className={classes.picture} src={AppIcon} alt="connect"/>
                    <Typography variant="h2" className={classes.login} color="primary" >Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}  >
                        <TextField id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.textField}
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        fullWidth 
                        variant="outlined"
                        margin="normal"
                        error={errors.error ? true : false}
                        helperText={wrongEmail} />

                        <TextField id="password"
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField}
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            fullWidth 
                            variant="outlined"
                            margin="normal" 
                            error={errors.general ? true : false }
                            helperText={errors.general}/> <br/>

                        {loading && <CircularProgress className={classes.progress} /> } <br/>

                        <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        disabled={loading}> 
                        Login
                        </Button> 

                        <br/> <br/>
                        <small>Don't have an account ? signup <Link to="/signup"> here </Link> </small>
                    </form>
                </Grid>
                <Grid item xs/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)
