import Car_create from "./cars/Car_create";
import Car_list from "./cars/Car_list";
import Car_view from "./cars/Car_view";
import Greet from "./header/Greet";

function App()
{
  return(
<>

<h1><marquee>Car Parking Management</marquee></h1>
<Greet/>
<Car_create/>
<Car_view/>
<Car_list/>


</>
  );
}
export default App;