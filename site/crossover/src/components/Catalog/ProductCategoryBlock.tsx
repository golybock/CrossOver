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

interface IProps {
    products: IProduct[],
    category: string,
}

interface IState {
}

export default class ProductCategoryBlock extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="col">
                    <div className="Catalog-Header" id={this.props.category.replace('"' , '').replace('"' , '')}>
                        <h1>{this.props.category.replace('"' , '').replace('"' , '')}</h1>
                    </div>
                    <div className="row">
                        {this.props.products && (
                            this.props.products.map((product) => {
                                return (
                                    <Card style={{width: '344px', height: '593px', margin: '48px'}}>
                                        <CardImg src={product.image}></CardImg>
                                        <CardTitle
                                            style={{margin: '12px', fontWeight: 700}}>{product.name}</CardTitle>
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
                                                if (AuthWrapper.user() != null) {
                                                    await CartProvider.addToCart(product.id, 1);
                                                    NotificationManager.makeSuccess("Добавлено")
                                                } else {
                                                    NotificationManager.makeError("Необходимо авторизоваться");
                                                }
                                            }} className="btn btn-primary Card-Button">Добавить в корзину</Button>
                                        </CardBody>
                                    </Card>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        );
    }
}