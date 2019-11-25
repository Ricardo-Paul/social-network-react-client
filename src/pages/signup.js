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


// redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

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

class signup extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        })

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
    
        this.props.signupUser(newUserData, this.props.history)

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors} = this.state;
        const wrongEmail = errors.error ? "Wrong email, please try again" : "";
        return (
            <Grid container className={classes.form}>
                <Grid item xs/>
                <Grid item xs>
                    <img className={classes.picture} src={AppIcon} alt="connect"/>
                    <Typography variant="h2" className={classes.login} color="primary">Signup</Typography>
                    <form noValidate onSubmit={this.handleSubmit}  >
                        <TextField id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        fullWidth 
                        variant="outlined"
                        margin="normal"
                        error={errors.email ? true : false}
                        helperText={errors.email} />

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
                            error={errors.password ? true : false }
                            helperText={errors.password}/> <br/>

                            <TextField id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            className={classes.textField}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth 
                            variant="outlined"
                            margin="normal" 
                            error={errors.confirmPassword ? true : false }
                            helperText={errors.confirmPassword}
                            disabled={false}/> <br/>

                            <TextField id="handle"
                            name="handle" 
                            type="text" 
                            label="Handle" 
                            className={classes.textField}
                            value={this.state.handle} 
                            onChange={this.handleChange} 
                            fullWidth 
                            variant="outlined"
                            margin="normal" 
                            error={errors.handle  ? true : false }
                            helperText={errors.handle}/> <br/>

                        {loading && <CircularProgress className={classes.progress} /> } <br/>

                        <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        disabled={loading}> 
                        Signup
                        </Button> 

                        <br/> <br/>
                        <small>Already have an account ? login <Link to="/login"> here </Link> </small>
                    </form>
                </Grid>
                <Grid item xs/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));
