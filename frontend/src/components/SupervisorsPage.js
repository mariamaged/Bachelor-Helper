// Our Components
import Table from './table.js';
// React Components
// React
import React, { Component } from 'react';

// Reacter Router and axios
import axios from 'axios';


class SupervisorsPage extends Component {
    state = {
        supervisors: []
    };

    componentDidMount() {
        axios.get('http://localhost:5000/api/supervisors')
            .then(response => {
                this.setState({ supervisors: response.data });
                console.log('State: ', this.state);
                console.log('Response for getting supervisors: ', response.data);
            })
            .catch(error => {
                console.log('Error: ', error);
            });
    }
    render() {
        const entireColumns = ["id", "thesisName", "category", "supervisorsInMET", "assistantSupervisorsInMET"];
        const cardContent = this.state.supervisors.length ? (this.state.supervisors.map((supervisor, index) => {
            return (<React.Fragment key={index}>
                <div class="card border-success mb-3" style={{maxWidth: "60rem"}}>
                    <div class="card-header"></div>
                    <div class="card-body">
                        <h4 class="card-title">{supervisor.supervisor}</h4>
                        <Table thesisList={supervisor.thesisList} columns={entireColumns} />
                    </div>
                </div>
            </React.Fragment>)
        })) : (<div />)
        return (
            <div class="container">
                {cardContent}
            </div>
        )

    }
}

export default SupervisorsPage;