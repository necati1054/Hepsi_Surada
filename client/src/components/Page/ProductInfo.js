import React, { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import HomeServices from '../Services/HomeServices';
import { Container,Row,Col, Input, Button,Label, FormGroup, Badge,  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormText, } from 'reactstrap';
import UstNabvar from '../navbars&footer/UstNabvar'

function ProductInfo() {
    const params = useParams();
    const navigate = useNavigate();
    const [productInfo,setProductInfo] = useState([])
    useEffect(()=>{
        const AxiosData = async() =>{
            const data = await HomeServices.ProductInfo({product_id:params})
            if(Object.values(data) == "product"){
                navigate(-1)
            }else{
                setProductInfo(data[0])
            }
        }
        if(Object.keys(productInfo).length === 0){
            AxiosData();
        }
    })

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    // console.log(productInfo);

    function opacity(e){
        var data = document.getElementById("photos")
        var main = document.getElementById("main");
        main.src = e.target.src
        var data2 = data.children;
        for (let i = 0; i < data2.length; i++) {
            data2[i].children[0].classList.remove("opacity")
        }
        e.target.classList.add("opacity")
    }

  return (
    <>
    <UstNabvar/>
    <Container>
        <Row className='mt-5'>
            <Col md={1}></Col>
            <Col md={10}>
                <div className="card mb-3">
                <Row className="g-0">
                    <Col md={6}>
                    <img id="main" src={"http://localhost:8000/Image/"+(productInfo && productInfo.photos && productInfo.photos[0].path)} className="img-fluid rounded-start w-100" alt="..."/>
                    <Row id="photos">
                        <Col md={4}>
                            <img src={"http://localhost:8000/Image/"+(productInfo && productInfo.photos && productInfo.photos[0].path)} className="img-fluid rounded-start opacity" alt="..." onClick={(e)=>opacity(e)}/>
                        </Col>
                        <Col md={4}>
                            <img src={"http://localhost:8000/Image/"+(productInfo && productInfo.photos && productInfo.photos[1].path)} className="img-fluid rounded-start" alt="..." onClick={(e)=>opacity(e)}/>
                        </Col>
                        <Col md={4}>
                            <img src={"http://localhost:8000/Image/"+(productInfo && productInfo.photos && productInfo.photos[2].path)} className="img-fluid rounded-start" alt="..." onClick={(e)=>opacity(e)}/>
                        </Col>
                    </Row>
                    </Col>
                    <Col md={6}>
                        <Row className='ms-3'>
                            <div className="card-body">
                                <h5 className="card-title">{productInfo.name}</h5>
                                <p className="card-text">{productInfo.description}</p>
                                <strong className="card-text">{productInfo && productInfo.store_product && productInfo.store_product[0].price}€ </strong><br/>
                                <FormGroup row>
                                        <Label md={2} htmlFor='count'>Count =</Label>
                                        <Col>
                                        <Input id="count" className='w-25' type="number" max={productInfo && productInfo.store_product && productInfo.store_product[0].stock} min="1" defaultValue="1"></Input>
                                        <FormText>stock = {productInfo && productInfo.store_product && productInfo.store_product[0].stock}</FormText>
                                        </Col>
                                </FormGroup>
                                <p>Satıcı = <span>{productInfo && productInfo.store_product && productInfo.store_product[0].store && productInfo.store_product[0].store.name}</span></p> 
                                
                                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
                                    <DropdownToggle caret>Other Store</DropdownToggle>
                                    <DropdownMenu>
                                    <DropdownItem header>Other Store</DropdownItem>
                                    {
                                        productInfo && productInfo.store_product && productInfo.store_product.map((item,i)=>(<DropdownItem key={item.store.id}>{item.store.name} <Badge color='primary'>price = {item.price} : stock = {item.stock}</Badge> </DropdownItem>))
                                    }
                                    </DropdownMenu>
                                </Dropdown>
                                <Button className='mt-5 w-50' color="success">Add To Card</Button>
                            </div>
                        </Row>
                        <Row>

                        </Row>
                    </Col>
                </Row>
                </div>
            </Col>
            <Col md={1}></Col>
        </Row>
    </Container>
    </>
  )
}

export default ProductInfo