import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

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
        this.setState({email : '', password : ''});
    }

    handleChange = (event) => {

        const { name, value } = event.target;
        this.setState({[name] : value});
    }

    render() {

        const { email, password } = this.state;
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" 
                                type="email"
                                value={email}
                                handleChange={this.handleChange}
                                label="Email"
                                required />
                    
                    <FormInput name="password"
                                type="password"
                                value={password}
                                handleChange={this.handleChange}
                                label="Password" 
                                required />

                    <CustomButton name="submit"
                            type="submit"
                            value="Submit Form" > Sign in
                    </CustomButton>
                </form>
            </div>
        );
    }
}

export default SignIn;