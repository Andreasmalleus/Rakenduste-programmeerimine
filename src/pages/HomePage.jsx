import React from "react";
import Header from ".././components/Header.jsx";
import Footer from ".././components/Footer.jsx";
import ItemLists from ".././components/ItemLists.jsx";
import CategoryView from ".././components/CategoryView.jsx";
import SortDropdown from ".././components/SortDropdown.jsx";
//import {newClothesReede, hoodiesReede, shoesReede} from "./database.js";
//import {newClothesEnd, hoodiesEnd, shoesEND} from "./database.js";
import {connect} from "react-redux";
import {getItems} from "../store/store.js";
import PropTypes from "prop-types";



class HomePage extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            items : [],
            selectedCategory : "New This Week | END.",
            sortDirection : -1
        };
    }

    
    componentDidMount(){
            this.fetchItems();
        }

    fetchItems  = () => {
        this.props.dispatch(getItems());
    
    }


    //handle need to be in parent
    handleCategory = (value) =>{
        //console.log(value);
        this.setState({
            selectedCategory : value
        });       
    };

    handleSortDropdown = (value) => {
        //console.log(value);
        this.setState({
            sortDirection : value
        });
    }

    setVisibleItems =() => {
        return this.props.items
        .filter(item => item.category === this.state.selectedCategory)
        .sort((a,b) => {
            switch(this.state.sortDirection){
                case -1: return b.price - a.price;
                case 1: return a.price - b.price;
            }
        });
    }

    showItemCount = () => {
        return this.props.items.filter(item => item.category == this.state.selectedCategory).length;
    }


    render(){
        console.log(this.props, "this is props");
    return (
        <>
        <Header />
        <SortDropdown onChange={this.handleSortDropdown}/>
        <CategoryView onChange={this.handleCategory} itemsLen={this.showItemCount()}/>
        <ItemLists items={this.setVisibleItems()}/>
        <Footer />
        </>
    );
    //sending event hande as prop
    }
}

const mapStateToProps = (store) => {
    return{
        items: store.items,
        error : store.error
    };
};

HomePage.propTypes = {
    dispatch : PropTypes.func,
    items : PropTypes.array
};

export default connect(mapStateToProps)(HomePage);

