import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

//import { DataContext } from "../DataProvider/DataProvider";
export default function Header() {
  const [{ user, basket }] = useContext(DataContext);
   console.log(basket);
   const totalItem = basket?.reduce((amount,item)=>{
     return item.amount + amount
   },0)
  return (
    <>
      <section className={classes.fixed}>
        <section>
          <div className={classes.header_container}>
            {/* logo section */}
            <div className={classes.logo_container}>
              {/* logo */}
              <Link to="/">
                <img
                  src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt="amazon logo"
                />
              </Link>
              {/* delivery */}
              <div className={classes.delivery}>
                <span>
                  <SlLocationPin />
                </span>
                <div>
                  <p>Deliver to</p>
                  <span>USA</span>
                </div>
              </div>
            </div>
            <div className={classes.search}>
              {/* search */}
              <select name="" id="">
                <option value="">All</option>
              </select>
              <input type="text" placeholder="search product" />
              <FaSearch />
            </div>
            {/* right side link */}
            <div className={classes.order_container}>
              <Link className={classes.language}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png"
                  alt=""
                />
                <select name="" id="">
                  <option value="">EN</option>
                </select>
              </Link>
              {/* three components */}
             <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
              {/* orders */}
              <Link to="orders">
                <p>returns</p>
                <span>& Orders</span>
              </Link>
              {/* cart */}
              <Link to="/cart" className={classes.cart}>
                {/* icon */}
                <BiCart size={35} />
                <span>{totalItem}</span>
              </Link>
            </div>
          </div>
        </section>
        <LowerHeader />{" "}
      </section>
    </>
  );
}
// import React, { useContext } from "react";
// import { FaSearch } from "react-icons/fa";
// import { BiCart } from "react-icons/bi";
// import { SlLocationPin } from "react-icons/sl";
// import { Link } from "react-router-dom";
// import classes from "./Header.module.css";
// import LowerHeader from "./LowerHeader";
// import { DataContext } from "../DataProvider/DataProvider";

// function Header() {
//   const [{basket}, dispatch] = useContext(DataContext);
//   // console.log(basket);
//   const totalItem = basket?.reduce((amount,item)=>{
//     return item.amount + amount
//   },0)
//   return (
//     <section className={classes.fixed}>
//       <section>
//         <div className={classes.header_container}>
//           {/* logo section */}
//           <div className={classes.logo_container}>
//             {/* logo */}
//             <Link to="/">
//               <img
//                 src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
//                 alt="amazon logo"
//               />
//             </Link>
//             {/* delivery */}
//             <div className={classes.delivery}>
//               <span>
//                 <SlLocationPin />
//               </span>
//               <div>
//                 <p>Deliver to</p>
//                 <span>Ethiopia</span>
//               </div>
//             </div>
//           </div>

//           <div className={classes.search}>
//             {/* search */}
//             <select name="" id="">
//               <option value="">All</option>
//             </select>
//             <input type="text" placeholder="search product" />
//             <FaSearch />
//           </div>

//           {/* right side link */}
//           <div className={classes.order_container}>
//             <Link className={classes.language}>
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png"
//                 alt=""
//               />
//               <select name="" id="">
//                 <option value="">EN</option>
//               </select>
//             </Link>
//             {/* three components */}
//             <Link to="/auth">
//               <div>
//                 <p>Sign In</p>
//                 <span>Account & Lists</span>
//               </div>
//             </Link>
//             {/* orders */}
//             <Link to="/orders">
//               <p>returns</p>
//               <span>& Orders</span>
//             </Link>
//             {/* cart */}
//             <Link to="/cart  " className={classes.cart}>
//               {/* icon */}
//               <BiCart size={35} />
//               <span>{totalItem}</span>
//             </Link>
//           </div>
//         </div>
//       </section>
//       <LowerHeader />
//     </section>
//   );
// }

// export default Header;
