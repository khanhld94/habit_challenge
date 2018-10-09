import React, { Component } from 'react';

class Pagination extends Component{
    constructor(props,context){
        super(props,context);
        this.renderPagination = this.renderPagination.bind(this);
        this.pagination = this.pagination.bind(this);
        this.state = {
            currentPage: 1,
        }
    }
    renderPagination(){
        let count = this.props.allItems.length
        return Math.ceil(count/5)
    }
    pagination(page){
        this.setState({
            currentPage: page
        })
        this.props.pagination(page)
    }
    render(){
        let count = this.renderPagination();
        let numberlist =[];
        for(let i=1; i <= count; i++){
            numberlist.push(
                <li key={"page"+i} className={"page-item "+ (this.state.currentPage === i ? "active" : null)}>
                    <a className="page-link"
                       onClick={()=>this.pagination(i)}>{i}</a></li>
            )
        }
        return(
            <nav className="pagination-wrapper">
                <ul className="pagination justify-content-center">
                    {this.props.allItems.length < 2 || this.state.currentPage === 1 ? (
                        null
                    ) : (
                        <li className="page-item">
                            <a className="page-link" onClick={()=>this.pagination(this.state.currentPage-1)}>Previous</a>
                        </li>
                    )}
                    {numberlist}
                    {
                        this.state.currentPage === Math.ceil(this.props.allItems.length/5) ? (null) : (<li className="page-item">
                            <a className="page-link" onClick={()=>this.pagination(this.state.currentPage+1)}>Next</a>
                        </li>)
                    }

                </ul>
            </nav>
        )
    }
}
export default Pagination;