import React, { Component } from 'react'
import axios from 'axios'

import ProductItem from './ProductItem';

class Home extends Component {
    state = {
        products: [],
        productSearch: []
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

    
    getProduct = () => {
        axios.get('http://localhost:1992/product')
            .then(res => {
                this.setState({products: res.data, productSearch: res.data})
            })
    }
    
    renderList = () => {
       return this.state.productSearch.map(iteem => {
            return (
                <ProductItem item={iteem}/>
            )
        })
    }

    onBtnSearch = () => {
        const name = this.name.value // h
        const min = parseInt(this.min.value) // NaN
        const max = parseInt(this.max.value) // NaN

        var arrSearch = this.state.products.filter(item => {
            if (isNaN(min) && isNaN(max)) {// search hanya dengan name , min dan max kosong
                return (
                    item.name.toLowerCase().includes(name.toLowerCase())
                )
            } else if (isNaN(min)) {
                return (
                    item.name.toLowerCase().includes(name.toLowerCase()) &&
                    item.price <= max
                )
            } else if (isNaN(max)) {
                return (
                    item.name.toLowerCase().includes(name.toLowerCase()) &&
                    item.price >= min
                )
            } else {
                return (
                    item.name.toLowerCase().includes(name.toLowerCase()) &&
                    item.price <= max &&
                    item.price >= min
                )
            }

        })

        this.setState({ productSearch: arrSearch })


    }

    render() {
        console.log(this.state.products)
        // if(this.props.username !== ""){

            

        // }
        return (
            <div className="row">
                <div className="col-2">
                <div className="mt-5 row">
                        <div className="mx-auto card">
                            <div className="card-body">
                                <div className="border-bottom border-secondary card-title">
                                    <h1>Search</h1>
                                </div>
                                <div className="card-title mt-1">
                                    <h4>Name</h4>
                                </div>
                                <form className="input-group"><input ref={input => this.name = input} className="form-control" type="text"/></form>
                                <div className="card-title mt-1">
                                    <h4>Price</h4>
                                </div>
                                <form className="input-group"><input placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                <form className="input-group"><input placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                <button onClick={this.onBtnSearch} className="btn btn-outline-secondary btn-block mt-5">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row col-sm-10">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

export default Home