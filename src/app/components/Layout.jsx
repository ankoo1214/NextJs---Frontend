import { Component } from "react"
import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css'
class Layout extends Component{
    render(){
        const {children} = this.props
        return (<div className="layout">
                  <Header/>
                  {children}
        </div>)
    } 
}
