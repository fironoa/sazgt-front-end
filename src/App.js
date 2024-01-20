import {Routes, Route} from 'react-router-dom'
import { Products } from './components/Products/Products';
import { Home } from './components/Home/Home';
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/products" element={<Products/>}></Route>
      <Route path="/" element={<Home/>}></Route>
    </Routes>
  );
}

export default App;
