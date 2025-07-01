import { useContext, useEffect } from "react";
import Routing from "./Pages/Router/Router";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";
import { DataContext } from "./Components/DataProvider/DataProvider";

function App() {
  const [{}, dispatch] = useContext(DataContext); // Correct use of state & dispatch

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      dispatch({
        type: Type.SET_USER,
        user: authUser || null,
      });
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <Routing />;
}

export default App;
