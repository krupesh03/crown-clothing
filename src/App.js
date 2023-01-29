import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
//import React, { useState, useEffect } from 'react';
import { auth, createUserProfileDocument, onSnapshotDoc } from './firebase/firebase.utils';
//import { auth, createUserProfileDocument } from './firebase/firebase-old-version.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';

class App extends React.Component {

  /**
   * below constructor not needed because we are using reducer for currentUser as setCurrentUser
   */
  /*constructor() {
    super();

    this.state = {
      currentUser: null
    }
    
  }*/

  unsubcribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;

    this.unsubcribeFromAuth = auth.onAuthStateChanged( async (userAuth) => {
      // this.setState({currentUser: user});
      // console.log(user);
      if( userAuth ) {
        const UserRef  = await createUserProfileDocument(userAuth);
        //console.log(UserRef);
        /**
         * webversion 8 (namespaced)
         */
        // UserRef.onSnapshot( (snapShot) => {
        //   //console.log(snapShot.data());
        //   this.setState({
        //     currentUser: {
        //       id : snapShot.id,
        //       ...snapShot.data()
        //     }
        //   }, () => {
        //     console.log(this.state);
        //   });
        // });

        /**
         * Web version 9 (modular)
         */
         onSnapshotDoc(UserRef, (snapShot) => {
          //console.log(snapShot.data());
          // this.setState({
          //   currentUser: {
          //     id: snapShot.id,
          //     ...snapShot.data()
          //   }
          // });
          setCurrentUser({
            id: snapShot.id,
              ...snapShot.data()
          })
        })
      } else {
        //this.setState({ currentUser: null })
        setCurrentUser(null);
      }
    });
  }

  componentWillUnmount() {

    this.unsubcribeFromAuth();
  }

  render() {
    return (
      <div>
        <Router>
          <Header />
          <Routes>
            <Route exact path='/' element={ <HomePage /> } />
            <Route path='/shop' element={ <ShopPage /> } />
            <Route exact path='/signin' element={ this.props.currentUser ? (<Navigate to='/' />) : (<SignInAndSignUp />)} />
            <Route exact path='/checkout' element={ <CheckoutPage /> } />
          </Routes>
        </Router>
      </div>
      
    );
  }
  
}

// function App() {

//   const [ currentUser, setCurrentUser ] = useState(null);

//   useEffect( () => {
//     auth.onAuthStateChanged( (user) => {
//       setCurrentUser(user);
//       console.log(currentUser);
//     });
//   }); 

//   return (
//     <div>
//       <Router>
//         <Header />
//         <Routes>
//           <Route exact path='/' element={<HomePage />} />
//           <Route path='/shop' element={ <ShopPage /> } />
//           <Route path='/signin' element={ <SignInAndSignUp /> } />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// const mapStateToProps = ({user}) => ({
//   currentUser : user.currentUser //used reducer over here
// });
const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser //used reducer over here
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser : user => dispatch(setCurrentUser(user)) //used reducer over here
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
