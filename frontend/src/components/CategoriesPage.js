// Our Components
import Table from './table.js';
// React Components
// React
import React, { Component } from 'react';

// Reacter Router and axios
import axios from 'axios';

// CSS and images
import object from '../assets/imagedata.js';

class CategoriesPage extends Component {
    state = {
        categories: []
    };

    componentDidMount() {
        axios.get('http://localhost:5000/api/categories')
            .then(response => {
                this.setState({ categories: response.data });
                console.log('State: ', this.state);
                console.log('Response for getting categories: ', response.data);
            })
            .catch(error => {
                console.log('Error: ', error);
            });
    }
    render() {
        const entireColumns = ["id", "thesisName", "supervisorInStudent", "supervisorsInMET", "assistantSupervisorsInMET"];
        const cardContent = this.state.categories.length ? (this.state.categories.map((category, index) => {
            return (<React.Fragment key={index}>
                <div class="card border-success mb-3" style={{maxWidth: "60rem"}}>
                    <h4 class="card-header">{category.category}</h4>
                    {object[category.category]}
                    <div class="card-body">
                        <h6 class="card-title" style={{ color: "#000000" }}>{category.categoryDescription}</h6>
                    </div>
                    <ul class="list-group list-group-flush">
                    <Table thesisList={category.thesisList} columns={entireColumns} />
                    </ul>
                </div>
            </React.Fragment>)
        })) : (<div />)
        return (
            <div className="container">
            <br/>
            <br/>
                {cardContent}
            </div>);
    }
}

export default CategoriesPage;