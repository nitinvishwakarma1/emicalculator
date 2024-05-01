import { Routes, Route} from 'react-router-dom';
import { NavbarComponent } from './components/other_component/Navbar';
import { EMI_Calculator } from './components/emi_calculator/EMI_Calculator.js';
// import { PieChart } from 'react-minimal-pie-chart';

function App() {
  return (<>
    <NavbarComponent/>
    <Routes>
      <Route path="/" element={<EMI_Calculator/>}></Route>
      {/* <Route path="/piechart" element={<PieChart/>}></Route> */}
    </Routes>
  </>);
}

export default App;
