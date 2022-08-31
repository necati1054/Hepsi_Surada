import React, { useEffect, useState } from 'react'
import {CardBody,CardTitle,CardSubtitle,CardText,Button,Card} from 'reactstrap';
import {AllData} from '../features/Home/HomeSlice';
import HomeServices from '../Services/HomeServices';
import { useSelector,useDispatch } from 'react-redux';
function ProductCard() {
  const dispatch = useDispatch();
  const [products,setProducts] = useState([]);

  useEffect(() => {
    const fetcData = async() =>{
      const data = await HomeServices.AllData()
      setProducts(data)
    };
    if(Object.keys(products).length === 0){
      fetcData();
    }
  }, [])

  return (
    <div>
    <Card className='ms-3 mt-2' style={{ width: '17rem'}}>
    <img alt="Product" src="https://picsum.photos/300/200" style={{ height: '10rem'}} />
    <CardBody>
        <CardTitle tag="h5">
        Card title
        </CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
        Card subtitle
        </CardSubtitle>
        <CardText>
        Some quick example text to build on the card title and make up the bulk of the card‘s content.
        </CardText>
        <Button>
        İncele
        </Button>
    </CardBody>
    </Card>
    </div>
  )
}

export default ProductCard