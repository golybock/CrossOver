import React from "react";
import ProductProvider from "../../provider/productProvider";
import IProduct from "../../models/iProduct";
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "react-bootstrap";
import "./Catalog.css";
import HomeFiveBlock from "../Home/HomeFiveBlock";
import CartProvider from "../../provider/cartProvider";
import Footer from "../Footer/Footer";

interface IProps {

}

interface IState {
    products: IProduct[]
}

export default class Catalog extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            products: []
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
                        <h1>Каталог простых пластиковых окон</h1>
                        <div className="col">
                            <input type="text" placeholder="Поиск.."/>
                            <select>Цена</select>
                        </div>
                        <div className="row">
                            {this.state.products && (
                                this.state.products.map((product) => {
                                    return (
                                        <Card style={{width: '344px', height: '593px', margin:'48px'}}>
                                            <CardImg src={product.image}></CardImg>
                                            <CardTitle style={{margin:'12px', fontWeight: 700}}>{product.name}</CardTitle>
                                            <CardBody className="CardBody">
                                                <div className="CardBody-Price">
                                                    <h1>
                                                        {product.price} Р
                                                    </h1>
                                                    <label>
                                                        Под ключ <br/> {product.price * 1.9}
                                                    </label>
                                                </div>
                                                <Button onClick={async () => {
                                                    await CartProvider.addToCart(product.id, 1);
                                                }} className="btn btn-primary Card-Button">Добавить в корзину</Button>
                                            </CardBody>
                                        </Card>
                                    )
                                })
                            )}
                        </div>
                    </div>
                </div>
                <HomeFiveBlock/>
                <Footer/>
            </div>
        );
    }
}