import Car_create from "./cars/Car_create";
import Car_list from "./cars/Car_list";
import Car_view from "./cars/Car_view";
import {BrowserRouter,Routes,Route} from "react-router-dom";


function App()
{
  return(
<>
<BrowserRouter>
<Routes>
  <Route path="" element={<Car_list/>}/>
  <Route path="/car/list" element={<Car_list/>}/>
  <Route path="/car/create" element={<Car_create/>}/>
  <Route path="/car/view" element={<Car_view/>}/>
  </Routes></BrowserRouter>




</>
  );
}
export default App;