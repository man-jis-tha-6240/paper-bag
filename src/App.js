import './App.css';
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import CheckOut from './components/CheckOut';
import Address from './components/Address';
import AddProduct from './components/AddProduct';
import Payment from './components/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import Orders from './components/Orders';
const promise = loadStripe('pk_test_51LtcZ5SJOtPeEHARAF1d17yeTdJgdHOhv9gNRCnfzZNNU3D3J0t9qQWLNxTPfa0wvJIYWypBiCS9Jq1V7VawZ1nu00KLw3lg2b')
function App() {

  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/checkout" element={<CheckOut />}></Route>

          <Route path="/address" element={<Address />}></Route>

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<SignUp />} />

          <Route path="/addproduct" element={<AddProduct />} />

          <Route path="/payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Container>
    </Router>

  );
}
const Container = styled.div`width:100vw;`;

export default App;
