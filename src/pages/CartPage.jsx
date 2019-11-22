import React from "react";
import Header from "../components/Header.jsx";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "../../public/css/cartpage.css";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { removeItem } from "../store/actions.js";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CartPage extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            cart : [...props.cart]
        };
    }


    handleRemove = (_id) => {
        toast.success("Item removed from cart", {autoClose : 1500, position: toast.POSITION.TOP_CENTER});
        this.props.dispatch(removeItem(_id));

    }

    handleRedirect = () => {
        console.log("to the payment page we go");
    }

    
    render(){
        if(this.props.cart.length != 0){
            return(
                <>
                <Header />
                <div className={"cart-content"}>
                <table className="product-table">
                    <tr>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                    <ToastContainer/>
                    {this.props.cart.map((item, index) => {
                        return(
                                <tr key={index}>
                                    <td><img srcSet={item.imgSrc} className="cart-item-img"></img></td>
                                    <td className="cart-item-name">{item.title}</td>
                                    <td className="cart-item-category">{item.category}</td>
                                    <td className="cart-item-price">{item.price + "$"}</td>
                                    <td><IoIosCloseCircleOutline className="cart-icon-img" onClick={()=> this.handleRemove(item._id)}/></td>
                                </tr>
                        );
                    })}
                    </table>
                    <div className="info-box">
                    <div className="cart-total-sum">Total sum: {this.props.cart.map((item) => item.price).reduce((a,b) => a+b, 0)} $</div>
                    <div className="checkout-button-container"> 
                    <button className="checkout-button">Checkout</button>
                    </div>
                    </div>
                </div>
                </>
            );
        }else{
            return(
                <>
                 <Header />
                 <div className="empty-cart">
                    <img className="empty-cart-img" srcSet="/static/Images/empty-cart.png"></img>
                 </div>
                </>
            );
        }

    }


}

const mapStateToProps = (store) => {
    return{
        cart: store.cart
    };
};

CartPage.propTypes= {
    cart : PropTypes.arr,
    dispatch : PropTypes.func
};

export default connect(mapStateToProps)(CartPage);