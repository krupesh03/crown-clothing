import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import React from 'react';
//import React, { useState, useEffect } from 'react';
import { auth, createUserProfileDocument, onSnapshotDoc } from './firebase/firebase.utils';
//import { auth, createUserProfileDocument } from './firebase/firebase-old-version.utils';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    }
    
  }

  unsubcribeFromAuth = null;

  componentDidMount() {

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
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        })
      } else {
        this.setState({ currentUser: null })
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
          <Header currentUser={ this.state.currentUser } />
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/shop' element={ <ShopPage /> } />
            <Route path='/signin' element={ <SignInAndSignUp /> } />
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

export default App;
