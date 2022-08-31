import {React,useEffect,PureComponent, useState,useCallback} from 'react'
import {Card,CardTitle,CardText,CardHeader,CardBody,Container,Row, Col} from 'reactstrap'
import { AllCategory } from "../features/category/categorySlice"
import { AllSubCategory } from '../features/subCategory/subCategorySlice';
import { AllProductt } from "../features/product/ProductSlice"
import {AllTmpStore} from "../features/tmp/tmpStoreSlice"
import {AllStore} from "../features/store/storeSlice"
import { useSelector,useDispatch } from 'react-redux';
import UstNabvar from '../navbars&footer/UstNabvar'
import AdminNavbar from '../navbars&footer/AdminNavbar'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,PieChart, Pie,Sector } from 'recharts';

function AdminPanel() {
  
  const dispatch = useDispatch();
  const { category } = useSelector((state)=>state.category)
  const { subCategory } = useSelector((state)=>state.subCategory)
  const { product } = useSelector((state)=>state.product)
  const {tmpStore} = useSelector((state) => state.tmpStore)
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
    if(Object.keys(product).length === 0)
    {
      dispatch(AllProductt())
    }
    if(Object.keys(tmpStore).length === 0)
    {
      dispatch(AllTmpStore())
    }
    if(Object.keys(store).length === 0)
    {
      dispatch(AllStore())
    }
  }, [])

  const catgegory_length = category.length;
  const subCategory_length = subCategory.length;
  const product_length = product.length;
  const tmpStore_length = tmpStore.length;
  const store_length = store.length;

  const data = [
    {
      name: 'Category',
      total: catgegory_length,
    },
    {
      name: 'SubCategory',
      total: subCategory_length,
    },
    {
      name: 'Product',
      total: product_length,
    },
    {
      name: 'TmpStore',
      total: tmpStore_length,
    },
    {
      name: 'Store',
      total: store_length,
    },
  ];
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, total } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Total ${total}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const [active,setActive] =  useState(0);

  const onPieEnter = useCallback(
    (_, index) => {
      setActive(index);
    },
    [setActive]
  );

  return (
    <>
    <UstNabvar/>
    <Container>
        <Row className='mt-3'>
            <Col md={3}>
                <AdminNavbar/>
            </Col>
            <Col md={9}>
              <Row>
                <Col md={4}>
                  <Card className="my-2" color="primary" outline style={{width: '18rem'}}>
                  <CardHeader>Category</CardHeader>
                  <CardBody>
                    <CardTitle tag="h5" className='text-center'>
                      Total
                    </CardTitle>
                    <CardText className='text-center h1'>
                      {category.length}
                    </CardText>
                  </CardBody>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="my-2" color="primary" outline style={{width: '18rem'}}>
                    <CardHeader>SubCategory</CardHeader>
                    <CardBody>
                      <CardTitle tag="h5" className='text-center'>
                        Total
                      </CardTitle>
                      <CardText className='text-center h1'>
                        {subCategory.length}
                      </CardText>
                    </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                  <Card className="my-2" color="primary" outline style={{width: '18rem'}}>
                    <CardHeader>Product</CardHeader>
                    <CardBody>
                      <CardTitle tag="h5" className='text-center'>
                        Total
                      </CardTitle>
                      <CardText className='text-center h1'>
                        {product.length}
                      </CardText>
                    </CardBody>
                    </Card>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                <Card className="my-2" color="primary" outline style={{width: '18rem'}}>
                    <CardHeader>Pending Approval Stores</CardHeader>
                    <CardBody>
                      <CardTitle tag="h5" className='text-center'>
                        Total
                      </CardTitle>
                      <CardText className='text-center h1'>
                        {tmpStore.length}
                      </CardText>
                    </CardBody>
                  </Card> 
                </Col>
                <Col md={4}>
                <Card className="my-2" color="primary" outline style={{width: '18rem'}}>
                    <CardHeader>Our Active Stores</CardHeader>
                    <CardBody>
                      <CardTitle tag="h5" className='text-center'>
                        Total
                      </CardTitle>
                      <CardText className='text-center h1'>
                        {store.length}
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={4}>
                <PieChart width={400} height={400}>
                  <Pie activeIndex={active} activeShape={renderActiveShape} data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" dataKey="total" onMouseEnter={onPieEnter}/>
                </PieChart>
                </Col>
              </Row>
              <BarChart width={700} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5,}}barSize={20}>
                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="total" fill="#8884d8" background={{ fill: '#eee' }} />
              </BarChart>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default AdminPanel