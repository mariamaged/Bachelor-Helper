import ThesisTable from './components/ThesisTable.js';
import CategoriesPage from './components/CategoriesPage.js';
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
      <Route path='/tables' component={ThesisTable}></Route>
      <Route path='/categoriespage' component={CategoriesPage}></Route>
    </BrowserRouter>
  );
}

export default App;
