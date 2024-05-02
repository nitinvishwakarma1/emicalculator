import { Routes, Route} from 'react-router-dom';
import { NavbarComponent } from './components/header/Navbar.js';
import { EMI_Calculator } from './components/emi_calculator/EMI_Calculator.js';
import PieChart from './components/emi_calculator/PieChart.js';
import BarChartComponent from './components/emi_calculator/BarChartComponent.js';
function App() {
  return (<>
    <NavbarComponent/>
    <Routes>
      <Route path="/" element={<EMI_Calculator/>}></Route>
      <Route path="/piechart" element={<PieChart/>}></Route>
      <Route path="/barchart" element={<BarChartComponent/>}></Route>
    </Routes>
  </>);
}

export default App;
