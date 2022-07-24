import React from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
//import { auth, createUserProfileDocument } from '../../firebase/firebase-old-version.utils';
import { auth, createUserProfileDocument, createGoogleUserWithEmailAndPassword } from '../../firebase/firebase.utils';

class SignUp extends React.Component {

    constructor() {
        super();

        this.state = {
            displayName : '',
            email : '',
            password : '',
            confirmPassword : ''
        }
    }

    handleSubmit = (event) => {

        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;
        
        if( password.length < 6 ) {
            alert("Password should be of minimum 6 characters");
            return;
        }
        if( password !== confirmPassword ) {
            alert("Password and Confirm Password don't match");
            return;
        }
        try{
            /**
             * webversion 8 (namespaced)
             */
            // const { user } = auth.createUserWithEmailAndPassword( email, password );
            // console.log(user);
            // createUserProfileDocument(user, {displayName} );
            /**
             * Web version 9 (modular)
             */
            createGoogleUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                //console.log(user);
                createUserProfileDocument(user, {displayName} );
                this.setState({
                    displayName : '',
                    email : '',
                    password : '',
                    confirmPassword : ''
                });
                //console.log(this.state);
            }).catch((error) => {
                console.error(error.message);
                alert(error.message);
            })
        } catch( error ) {
            console.error(error.message);
            alert(error.message);
        }
    }

    handleChange = (event) => {

        const { name, value } = event.target;
        this.setState({ [name]: value});
    }

    render() {

        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with Email and Password</span>

                <form onSubmit={ this.handleSubmit } className="sign-up-form">
                    <FormInput 
                        type="text"
                        value={displayName}
                        name="displayName"
                        handleChange={ this.handleChange }
                        label="Display Name"
                        required
                    />
                    <FormInput 
                        type="email"
                        value={email}
                        name="email"
                        handleChange={ this.handleChange }
                        label="Email"
                        required
                    />
                    <FormInput 
                        type="password"
                        value={password}
                        name="password"
                        handleChange={ this.handleChange }
                        label="Password"
                        required
                    />
                    <FormInput 
                        type="password"
                        value={confirmPassword}
                        name="confirmPassword"
                        handleChange={ this.handleChange }
                        label="Confirm Password"
                        required
                    />

                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;