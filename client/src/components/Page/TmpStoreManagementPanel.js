import React, { useEffect } from 'react'
import { Container,Row,Col,Form,FormGroup,Label,Input, Button, List,Table} from 'reactstrap'
import { useSelector , useDispatch } from 'react-redux';
import { useNavigate }  from 'react-router-dom'
import UstNabvar from '../navbars&footer/UstNabvar'
import AdminNavbar from '../navbars&footer/AdminNavbar'
import {AllTmpStore,UpdateTmpStore} from "../features/tmp/tmpStoreSlice"
import {AllStore} from "../features/store/storeSlice"

function TmpStoreManagementPanel() {
  const {tmpStore} = useSelector((state) => state.tmpStore)
  const {store} = useSelector((state)=> state.store)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if((Object.keys(tmpStore).length === 0))
    {
      dispatch(AllTmpStore());
    }
    if((Object.keys(store).length === 0))
    {
      dispatch(AllStore());
    }
  },[])

  function Onay(e) {
    console.log(e);
    const item = {
      tmp_store_id:e
    }
    dispatch(UpdateTmpStore(item))
  }

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
                <h4>Onay bekleyen</h4>
              <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Emial</th>
                      <th>Adress</th>
                      <th>Tel</th>
                      <th>Button</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tmpStore.map((ts,i)=>(
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{ts.name}</td>
                          <td>{ts.email}</td>
                          <td>{ts.adres}</td>
                          <td>{ts.tel}</td>
                          <td><Button id={ts.id} onClick={(e)=>Onay(e.target.id)}>Onayla</Button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </Row>
              <Row>
                <h4>Aktif Marketlerimiz</h4>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Emial</th>
                      <th>Adress</th>
                      <th>Tel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      store.map((ts,i)=>(
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{ts.name}</td>
                          <td>{ts.email}</td>
                          <td>{ts.adres}</td>
                          <td>{ts.tel}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </Row>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default TmpStoreManagementPanel