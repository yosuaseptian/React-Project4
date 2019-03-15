import React, { Component } from 'react'
import axios from 'axios'

import ProductItem from './ProductItem';

class Home extends Component {
    state = {
        products: []
    }

    componentDidMount () {
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:1992/product')
            .then(res => {
                this.setState({products: res.data})
            })
    }
    
    renderList = () => {
       return this.state.products.map((iteem, i) => {
            return (
                <ProductItem key={i} item={iteem}/>
            )
        })
    }

    render() {
        console.log(this.state.products)
        return (
            <div className="row">
                <div className="col-sm-2">
                    <h1 className="display-4">Search</h1>
                </div>
                <div className="row col-sm-10">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

export default Home