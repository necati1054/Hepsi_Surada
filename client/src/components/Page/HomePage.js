import React, { useEffect,useState,useRef } from 'react'
import UstNabvar from '../navbars&footer/UstNabvar'
// import ProductCard from '../Card/ProductCard';
import { Container, Col,Row,CardGroup,FormGroup,Input,Label,Button,CardText,CardSubtitle,CardTitle,CardBody,Card,List } from 'reactstrap';
import AltFooter from '../navbars&footer/AltFooter';
import { useSelector,useDispatch } from 'react-redux';
import HomeServices from '../Services/HomeServices';
import {AllStore} from "../features/store/storeSlice"

import {AllCategory} from "../features/category/categorySlice"
import {AllSubCategory} from"../features/subCategory/subCategorySlice"
import {AllProductt} from "../features/product/ProductSlice"
import { NavLink, useNavigate } from 'react-router-dom';

import ReactPaginate from 'react-paginate';


function HomePage() {
  const navigate = useNavigate();
  var location = document.URL
  var NewLocation = new URL(location)
  var urll = NewLocation.searchParams.get("page")
  var UrlSc = NewLocation.searchParams.get("sc")
  var UrlS = NewLocation.searchParams.get("s")
  var UrlKey = NewLocation.searchParams.get("key")
  const [products,setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  var itemsPerPage = 2
  const dispatch = useDispatch();
  const [serachKey,setSearchKey] = useState( UrlKey !== null && UrlKey != "" ? UrlKey : "");

  const {category} =useSelector((state)=>state.category)
  const {subCategory} =useSelector((state)=>state.subCategory)
  const {store} = useSelector((state)=> state.store)

  useEffect(() => {
    if(Object.keys(category).length === 0)
    {
        dispatch(AllCategory());
    }
    if(Object.keys(subCategory).length === 0)
    {
      dispatch(AllSubCategory())
    }
    if(Object.keys(store).length === 0)
    {
      dispatch(AllStore())
    }
    setTimeout(() => {
      storeChoose();
      subChoose();
    }, 1000);
  }, [])

  const fetcData = async(item,UrlSc,UrlS,UrlKey) =>{
    item = item == null ? 1 : item
    const a = UrlSc != null & UrlSc != "" ? "&sc="+UrlSc :""
    const b = UrlS != null & UrlS != "" ? "&s="+UrlS :""
    const c = UrlKey != null & UrlKey != "" ? "&key="+UrlKey : ""
    const data = await HomeServices.AllData(item+a+b+c)
    setProducts(Object.values(data.data))
    setPageCount(Math.ceil(data.total/itemsPerPage))
    navigate( "?page=" + item + a + b + c)
  };

  useEffect(() => {
    fetcData(1,UrlSc,UrlS,serachKey);
  }, [serachKey])


  const handlePageClick = (event) => {
    fetcData((event.selected +1),UrlSc,UrlS,UrlKey);
  };

  //sub categori seçilince
  function subTick(e) {
    var selectSub = e.target.getAttribute("main_id");
    var check = ""
    const sub = document.getElementsByClassName("subTickCheck");
    for (let i = 0; i < sub.length; i++) {
      if(sub[i].checked){
        if(!check){
          check += (sub[i].id);
        }else{
          check += ","+(sub[i].id);
        }
      }
    }
   fetcData(1,check,UrlS,UrlKey);
  }

  //main categori seçilince 
  function mainTick(e) {
    var dizi = []
    var main = document.getElementsByClassName("mainTickCheck");
    Object.values(main).forEach(function(element,index){
      if(element.checked){
        dizi.push(element.id)
      }
    })
    var checked = ""
    var sub = document.getElementsByClassName("subTickCheck");
    for (let i = 0; i < sub.length; i++) {
      if(dizi.includes(sub[i].getAttribute("main_id"))){
        if(!checked){
          checked += (sub[i].id)
          sub[i].checked = true
        }else{
          checked += ","+(sub[i].id)
          sub[i].checked = true
        }
      }else{
        sub[i].checked=false
      }
    }
    fetcData(1,checked,UrlS,UrlKey);
  }

  function storeTick() {
    let check = ""
    var store = document.getElementsByClassName("storeTickCheck");
    Object.values(store).forEach(function(element,index){
      if(element.checked){
        if(!check){
          check += element.id
        }else{
          check += ","+element.id
        }
      }
    })
    fetcData(1,UrlSc,check,UrlKey);
  }

  function storeChoose() {
    if(UrlS){
      var store = document.getElementsByClassName("storeTickCheck");
      var dizi = UrlS.split(",")
      Object.values(store).forEach(function(element,index){
        if(dizi.includes(element.id)){
          element.checked = true;
        }
      })
    }
  }


  //checkleme yaptırdığım kısım
  const [subs,setSubs] =  useState();
  
  useEffect(() => {
    setSubs(subCategory)
    subChoose()
  }, [subCategory])

  function multiChecked(e){
    const {id,checked} = e.target;
    const main_id = e.target.getAttribute("main_id")

    if(main_id === null){
        let tempSub = subs?.map((sub) =>{
          if(sub.main_category_id == id){
            return {...sub, isChecked: checked}
          }else{
            return {...sub};
          }
        })
        setSubs(tempSub);
    }else{
      var tempSub = subs?.map((sub)=>
        sub.id == id ? {...sub,isChecked:checked} :sub
      );
      console.log(tempSub);
      setSubs(tempSub);
    }
  }

  //f5 atınca sub ve main tick
    function subChoose() {
    let tempSub =[]
    if(UrlSc){
      var dizi = UrlSc.split(",")
      tempSub = subCategory?.map((sub)=>{
          if(dizi.includes((sub.id).toString()))
          {
            return {...sub,isChecked:true}
          }else
          {
            return {...sub}
          }
        })
    }
    if(tempSub.length!=0)
    {
      setSubs(tempSub)
    }
  }
  
  return (
    <>
      <UstNabvar search={setSearchKey}/>
      <Container className='' fluid="md">
        <Row className='mt-2'>
          <Col md={3}>
          <h5>Categories</h5>
          <List>
          <ul>
            {
              category?.map((cate,i)=>(
                <li key={cate.id}>
                <Input id={cate.id} type='checkbox' className='mainTickCheck' checked={subs?.filter((sub)=>sub.main_category_id == cate.id && sub.isChecked !== true).length <1} onChange={(e)=>{multiChecked(e);mainTick(e)}} />
                <Label className='ms-2'>{cate.name}</Label>
                <ul>
                {
                  subs?.map((subcate,i)=>subcate.main_category_id == cate.id && (
                    <li key={subcate.id}>
                      <Input id={subcate.id} main_id={cate.id} type='checkbox' checked={subcate?.isChecked || false} className='subTickCheck' onChange={(e)=>{multiChecked(e);subTick(e)}} />
                      <Label className='ms-2' >{subcate.name}</Label>
                      </li>
                  ))
                }
                </ul>
              </li>
              ))
            }
          </ul>
          </List>
          <h5>Stores</h5>
          <ul>
          {
            store.map((Store,i)=>
              <li key={Store.id}>
                <Input id={Store.id} type='checkbox' className='storeTickCheck' onChange={storeTick}/>
                <Label className='ms-2'>{Store.name}</Label>
              </li>
            )
          }
          </ul>
          
          </Col>
          <Col md={9}>
            <CardGroup>
              {
                products !== {} &&
                products?.map((product,i)=>(
                    <div key={i}>
                    <Card key={i} className='ms-3 mt-2' style={{ height:"30rem", width: '17rem'}}>
                    <div id={"carouselExampleControls" + product.id} className="carousel slide" data-bs-interval="false">
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img className='w-100' alt="Product" src={"http://localhost:8000/Image/"+product.photos[0].path} style={{height:"10rem"}}/>
                      </div>
                      <div className="carousel-item">
                        <img className='w-100' alt="Product" src={"http://localhost:8000/Image/"+product.photos[1].path} style={{height:"10rem"}}/>
                      </div>
                      <div className="carousel-item">
                        <img className='w-100' alt="Product" src={"http://localhost:8000/Image/"+product.photos[2].path} style={{height:"10rem"}}/>
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={"#carouselExampleControls" + product.id } data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next"  type="button" data-bs-target={"#carouselExampleControls" + product.id } data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                    <CardBody>
                        <CardTitle tag="h5">
                        {product.name}
                        </CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                        {product.name}
                        </CardSubtitle>
                        <div style={{height:"150px"}}>
                          <CardText>
                          {product.description}<br/>
                          </CardText>
                        </div>
                        <div>
                        <strong>{product?.product_store[0]?.info.price} €</strong><br/>
                          Satıcı =<span>{product?.product_store[0]?.name}</span>
                        </div>
                        <NavLink to={"/product_info/"+product?.id}>
                          <Button color='info'>review product</Button>
                        </NavLink>
                    </CardBody>
                    </Card>
                  </div>
                  
                ))
              }
            </CardGroup>
          </Col>
        </Row>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          // forcePage={urll == null ? 0 :(urll-1)}
        />
      </Container>
      <AltFooter/>
    </>
  )
}

export default React.memo(HomePage)