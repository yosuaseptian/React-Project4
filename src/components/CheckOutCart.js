// import React from "react";
// import { connect } from "react-redux";
// import axios from "axios";
// import Cookies from "universal-cookie";
// import { Link } from "react-router-dom";


// // import { onAddCartClick } from "../actions";

// const cookie = new Cookies();

// class CheckOutCart extends React.Component {
//   constructor(props) {
//     super(props);
//     this.formatterIDR = new Intl.NumberFormat('id', {
//         style: 'currency',
//         currency: 'IDR',
//         minimumFractionDigits: 0
//       })    
//   }
//   state = {
//     cartCheckout: [],
//     totalHarga:0
//   };

//   componentDidMount() {
//     // this.props.onAddCartClick();
//     console.log(this.props.username);
//     console.log(cookie.get("username"));

//     this.getCartCheckOut();
//   }

//   getCartCheckOut = () => {
//     axios
//       .get("http://localhost:1992/cart", {
//         params: {
//           username: cookie.get("username")
//         }
//       })
//       .then(results=> {
//         this.state.cartCheckout = results.data;
//         //console.log(this.state.cart);
//       });
//   };

//   totalAll = (totalPriceQty) =>{
//     let totalallPrice = 0;
//     //totalallPrice += totalPriceQty;
//     this.state.totalHarga +=  totalPriceQty; 
//   }

//   totalPrice = (price, qty) =>{
//     this.totalAll(price * qty);
//     //console.log(price * qty);
//     return price * qty;
//   }

//   onCheckoutMapCart = () => {
//     return this.state.cartCheckout.map(item => {
//       return (
//         <tr key={item.id}>
//           <td>{item.productId}</td>

//           <td>{item.name}</td>

//           <td>{item.desc}</td>

//           <td>{this.formatterIDR.format(item.price)}</td>

//           <td>
//             <img className="list" src={item.src} alt={item.src} />
//           </td>

//           <td>{item.qty}</td>
//           <td>{this.formatterIDR.format(this.totalPrice(item.price, item.qty))}
//           </td>
          
//         </tr>
        
//       );
//     });
//   };
  
//   render() {
//     //console.log(cookie.get("username"));
//     return (
//       <div className="container">
//         <h1 className="display-4 text-center"></h1>

//         <table className="table table-hover mb-5">
//           <thead>
//             <tr>
//               <th scope="col">ID</th>

//               <th scope="col">NAME</th>

//               <th scope="col">DESC</th>

//               <th scope="col">PRICE</th>

//               <th scope="col">PICTURE</th>

//               <th scope="col">QUANTITY</th>

//               <th scope="col">TOTAL PRICE</th>
//             </tr>
//           </thead>
//           <tbody>{this.onCheckoutMapCart()}</tbody>
//           <tfoot>
//             <tr>
//                 <td colSpan="6" className="right-text"><strong>Total</strong></td>
//                 <td>{this.formatterIDR.format(this.state.totalHarga)}</td>
//             </tr>
//           </tfoot>
//           {/* <div> */}
//             {/* <Link to={`/CheckOutCart`}>
//               <button>Checkout
//               </button>
//             </Link>
//           </div>
//           <div id="checkoutArea"></div> */}
//         </table>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return { username: state.auth.username };
// };

// export default connect(
//   mapStateToProps
//   //   { onAddCartClick }
// )(CheckOutCart);



import React, { Component } from 'react';

class CheckOutCart extends Component {
    constructor(props) {
        super(props);
        this.formatterIDR = new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
          })
          
    }

    total = () => {
        // return  this.props.list.reduce((a,b) => a.quantity * a.item.price + b.quantity * b.item.price)
        if (this.props.list !== 0) {
            let total = 0
            for (let elt of this.props.list) {
                let t = elt.qty * elt.price
                total += t
            }
            return total
        }else {
            return 0
        }
    }
    
    renderList = () => {
        return this.props.list.map(item=> {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{this.formatterIDR.format(item.price)}</td>
                    <td>{item.qty}</td>
                    <td>{this.formatterIDR.format(item.price * item.qty)}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">QUANTITY</th>
                            <th scope="col">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                
                <tfoot>
                    <tr>
                        <td colSpan="5" className="text-center"><strong>TOTAL :</strong></td>
                        <td>{this.formatterIDR.format(this.total())}</td>
                    </tr>
                </tfoot>
                </table>
                
            </div>
        );
    }
}

export default CheckOutCart;