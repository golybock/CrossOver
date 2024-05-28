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
                        <h1>Каталог простых пластиковых окон</h1>
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
                                this.state.products.map((product) => {
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
                                                    if(AuthWrapper.user() != null){
                                                        await CartProvider.addToCart(product.id, 1);
                                                        NotificationManager.makeSuccess("Добавлено")
                                                    }
                                                    else{
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
                <HomeFiveBlock/>
                <Footer/>
            </div>
        );
    }
}