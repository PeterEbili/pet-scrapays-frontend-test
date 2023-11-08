import React from 'react'
import Content from '../components/Content'
import Topbar from "../components/topbar/Topbar";

function Home() {
  return (
    <div>
    <Topbar/>
      <table style={{position:'absolute',top:300}}>
        <thead>
            <tr>
                {/* <th className='table-head-item'  style={{paddingLeft: 20}}> date</th> */}
                <th className='table-head-item' style={{paddingLeft: 10}}> id</th>
                <th className='table-head-item' style={{paddingLeft: 100}}> Title</th>
                <th className='table-head-item' style={{paddingLeft: 120}}> Body</th> 
                <th className='table-head-item' style={{paddingLeft: 90}}> Action</th> 
            </tr>
        </thead>
      </table>
      <Content />
    </div>
  
  )
}

export default Home