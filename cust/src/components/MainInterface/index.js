import { Component } from "react";
import "./index.css"

class MainInterface extends Component{
    state = {fetchedData:[],isloading:true,searchinput:"" ,isclicked:false}

    componentDidMount(){
        this.getapidata()
    }

    onChangeSearch = (event)=>{
        const inputval = event.target.value 
        this.setState({
            searchinput:inputval
        })
        
    }

    getapidata = async()=>{
        const {isclicked} = this.state
        const query = isclicked?"created_at_date":"sno"
        
        const response = await fetch(`http://localhost:8001/?sort=${query}`)
        const responseJson = await response.json()
        
        this.setState({
            fetchedData:responseJson.data,
            isloading:false
        })

    }

    selection = (event)=>{
        const selectedVal = event.target.value
        this.setState({
            query:selectedVal
        })
        console.log(selectedVal)
        this.getapidata()

    }

    clickedsort = ()=>{
        const {isclicked} = this.state 
        this.setState((prevState)=>({
            isclicked:!prevState.isclicked
        }))
        this.getapidata()
    }

    

    render(){
        const {fetchedData,searchinput} = this.state
        console.log(fetchedData)
        const filterData = fetchedData.filter((each)=>(
            each.customer_name.toLowerCase().includes(searchinput.toLowerCase()) || each.location.toLowerCase().includes(searchinput.toLocaleLowerCase())
        ))
        return(
            <div className="main">
                <div className="seachsortCont">
                    <div className="searchCont">
                    <img src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png" alt="search" className="imgg"/>
                    <input onChange={this.onChangeSearch} className="inputval" type="search" placeholder="search" />
                    </div>
                    <div>
                        <button onClick={this.clickedsort} className="btn">Sort by Date</button>
                    </div>

                </div>
                
                <table className="tableCont">
                    <thead  border="1">
                        <tr className="tableHEad">
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData.map(customer => (
                        <tr key={customer.sno}>
                            <td>{customer.sno}</td>
                            <td>{customer.customer_name}</td>
                            <td>{customer.age}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.location}</td>
                            <td>{customer.created_at_date}</td>
                            <td>{customer.created_at_time}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MainInterface