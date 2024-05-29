import React from "react";
import ProductProvider from "../../provider/productProvider";
import IProduct from "../../models/iProduct";
import {Button, Card, CardBody, CardImg, CardText, CardTitle, Form} from "react-bootstrap";
import "./Catalog.css";
import HomeFiveBlock from "../Home/HomeFiveBlock";
import CartProvider from "../../provider/cartProvider";
import Footer from "../Footer/Footer";
import {AuthWrapper} from "../../auth/AuthWrapper";
import NotificationManager from "../../tools/NotificationManager";
import ProductCategoryBlock from "./ProductCategoryBlock";

interface IProps {

}

export function toDictionary(array: IProduct[]) {
    let products = new Map<string, IProduct[]>;

    array.forEach(item => {
        const status = JSON.stringify(item.category.name);

        let val = products.get(status);

        if (!val) {
            products.set(status, [item]);
        } else {
            products.set(status, [...val, item])
        }
    })

    return Array.from(products, ([category, products]) => ({category, products}));
}

interface IState {
    products: IProduct[],
    search: string,
    sortType: number
}

enum price {
    lower = 0,
    upper = 1,
    notSort = 2
}

export default class Catalog extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            products: [],
            search: "",
            sortType: 0
        }
    }


    async componentDidMount() {
        const products = await ProductProvider.getProducts();

        this.setState({products: products})
    }

    render() {
        return (
            <div>
                <div className="Catalog">
                    <div className="col">
                        {/*<h1>Каталог простых пластиковых окон</h1>*/}
                        <div className="Search">
                            <Form.Control type="text" placeholder="Поиск.." value={this.state.search}
                                          onChange={async (e) => {

                                              this.setState({search: e.target.value})

                                              const products = await ProductProvider.search(this.state.search, this.state.sortType);

                                              this.setState({products: products})
                                          }}/>
                            <Form.Select aria-placeholder="Цена"
                                         value={this.state.sortType.toString()}
                                         onChange={async (e) => {
                                             this.setState({sortType: Number(e.currentTarget.value)})
                                             const products = await ProductProvider.search(this.state.search, this.state.sortType);

                                             this.setState({products: products})
                                         }}>
                                <option value="0">По Убыванию цены</option>
                                <option value="1">По возрастанию цены</option>
                                <option value="2">По умолчанию</option>
                            </Form.Select>
                        </div>
                        <div className="row">
                            {this.state.products && (
                                toDictionary(this.state.products).map(((item) => (
                                    <ProductCategoryBlock products={item.products} category={item.category}/>
                        )))
                        )}
                    </div>
                </div>
            </div>
        <HomeFiveBlock/>
        <Footer/>
    </div>
    )
        ;
    }
}