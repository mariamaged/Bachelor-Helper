import ThesisTable from './components/ThesisTable.js';
import CategoriesPage from './components/CategoriesPage.js';
import SupervisorsPage from './components/SupervisorsPage.js';
import StatisticsPage from './components/StatisticsPage.js';
import Navbar from './components/navbar.js';

import { BrowserRouter, Route } from 'react-router-dom';
import Image from './assets/5293.jpg';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <img src={Image} width="1000" height="400"></img>
      <div>
      <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>
      </div>
      <Route exact path='/' component={ThesisTable}></Route>
      <Route path='/categoriespage' component={CategoriesPage}></Route>
      <Route path='/supervisorspage' component={SupervisorsPage}></Route>
      <Route path='/calculationspage' component={StatisticsPage}></Route>
    </BrowserRouter>
  );
}

export default App;
