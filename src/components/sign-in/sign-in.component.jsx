import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle, auth, googleSignInWithEmailAndPassword } from '../../firebase/firebase.utils';

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email : '',
            password : ''
        }

    }

    handleSubmit = (event) => {

        event.preventDefault();
        const { email, password } = this.state;
        googleSignInWithEmailAndPassword( auth, email, password )
        .then( (user) => {
            //console.log(user.user);
            this.setState({email : '', password : ''});
        }).catch( (error) => {
            console.error(error.message);
            alert(error.message);
        });
        
    }

    handleChange = (event) => {

        const { name, value } = event.target;
        this.setState({[name] : value});
    }

    render() {

        const { email, password } = this.state;
        return (
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" 
                                type="email"
                                value={email}
                                handleChange={this.handleChange}
                                label="Email"
                                required 
                                autoComplete="username" />
                    
                    <FormInput name="password"
                                type="password"
                                value={password}
                                handleChange={this.handleChange}
                                label="Password" 
                                required 
                                autoComplete="new-password" />

                    <div className="buttons">
                        <CustomButton type="submit" > Sign in </CustomButton>

                        <CustomButton type="button" isGoogleSignIn onClick={ signInWithGoogle } > Sign in with Google </CustomButton>
                    </div>
                    
                </form>
            </div>
        );
    }
}

export default SignIn;