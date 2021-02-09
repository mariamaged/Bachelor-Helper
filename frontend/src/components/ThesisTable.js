// Our Components
import Table from './table.js';
// React Components
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// React
import React, { Component } from 'react';

// Reacter Router and axios
import axios from 'axios';

// CSS and images

class ThesisTable extends Component {
    state = {
        entireThesisList: [],
        unfoundThesisList: []
    };

    componentDidMount() {
        axios.get('http://localhost:5000/api/entireThesisList')
            .then(response => {
                this.setState({ entireThesisList: response.data });
                console.log('State: ', this.state);
                console.log('Response for getting entire thesis list: ', response.data);
            })
            .catch(error => {
                console.log('Error: ', error);
            });

        axios.get('http://localhost:5000/api/unfoundThesisList')
            .then(response => {
                this.setState({ unfoundThesisList: response.data });
                console.log('State: ', this.state);
                console.log('Response for getting unfound thesis list: ', response.data);
            })
            .catch(error => {
                console.log('Error: ', error);
            });

        axios.get('http://localhost:5000/api/allCategories')
            .catch(error => {
                console.log('Error: ', error);
            });

        axios.get('http://localhost:5000/api/allSupervisors')
            .catch(error => {
                console.log('Error: ', error);
            });
    }

    handleOnClick = (e) => {
        switch (e.target.id) {
            case 'categorya':
                axios.get('http://localhost:5000/api/entireSortCategoryAscending')
                    .then(response => {
                        this.setState({ entireThesisList: response.data });
                        console.log('State: ', this.state);
                        console.log('Response for getting unfound thesis list: ', response.data);
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    }); break;
            case 'categoryd':
                axios.get('http://localhost:5000/api/entireSortCategoryDescending')
                    .then(response => {
                        this.setState({ entireThesisList: response.data });
                        console.log('State: ', this.state);
                        console.log('Response for getting unfound thesis list: ', response.data);
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    }); break;
            case 'supervisora':
                axios.get('http://localhost:5000/api/entireSortSupervisorAscending')
                    .then(response => {
                        this.setState({ entireThesisList: response.data });
                        console.log('State: ', this.state);
                        console.log('Response for getting unfound thesis list: ', response.data);
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    }); break;

            case 'supervisord':
                axios.get('http://localhost:5000/api/entireSortSupervisorDescending')
                    .then(response => {
                        this.setState({ entireThesisList: response.data });
                        console.log('State: ', this.state);
                        console.log('Response for getting unfound thesis list: ', response.data);
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    }); break;

            case 'thesisa':
                axios.get('http://localhost:5000/api/entireSortThesisNameAscending')
                    .then(response => {
                        this.setState({ entireThesisList: response.data });
                        console.log('State: ', this.state);
                        console.log('Response for getting unfound thesis list: ', response.data);
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    }); break;

            case 'thesisd':
                axios.get('http://localhost:5000/api/entireSortThesisNameDescending')
                    .then(response => {
                        this.setState({ entireThesisList: response.data });
                        console.log('State: ', this.state);
                        console.log('Response for getting unfound thesis list: ', response.data);
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    }); break;

            case 'idd':
                axios.get('http://localhost:5000/api/entireSortIDDescending')
                    .then(response => {
                        this.setState({ entireThesisList: response.data });
                        console.log('State: ', this.state);
                        console.log('Response for getting unfound thesis list: ', response.data);
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    }); break;

            case 'thesisd':
                axios.get('http://localhost:5000/api/entireSortThesisNameDescending')
                    .then(response => {
                        this.setState({ entireThesisList: response.data });
                        console.log('State: ', this.state);
                        console.log('Response for getting unfound thesis list: ', response.data);
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    }); break;

            case 'idd':
                axios.get('http://localhost:5000/api/entireSortIDDescending')
                    .then(response => {
                        this.setState({ entireThesisList: response.data });
                        console.log('State: ', this.state);
                        console.log('Response for getting unfound thesis list: ', response.data);
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    }); break;

            case 'ida':
                axios.get('http://localhost:5000/api/entireThesisList')
                    .then(response => {
                        this.setState({ entireThesisList: response.data });
                        console.log('State: ', this.state);
                        console.log('Response for getting unfound thesis list: ', response.data);
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    }); break;

            case 'supervisora1':
                axios.get('http://localhost:5000/api/unfoundSortSupervisorAscending')
                    .then(response => {
                        this.setState({ entireThesisList: response.data });
                        console.log('State: ', this.state);
                        console.log('Response for getting unfound thesis list: ', response.data);
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    }); break;
            case 'supervisord1':
                axios.get('http://localhost:5000/api/unfoundSortSupervisorDescending')
                    .then(response => {
                        this.setState({ entireThesisList: response.data });
                        console.log('State: ', this.state);
                        console.log('Response for getting unfound thesis list: ', response.data);
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    }); break;

            case 'thesisa1':
                axios.get('http://localhost:5000/api/unfoundSortThesisNameAscending')
                    .then(response => {
                        this.setState({ entireThesisList: response.data });
                        console.log('State: ', this.state);
                        console.log('Response for getting unfound thesis list: ', response.data);
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    }); break;

            case 'thesisd1':
                axios.get('http://localhost:5000/api/unfoundSortThesisNameAscending')
                    .then(response => {
                        this.setState({ entireThesisList: response.data });
                        console.log('State: ', this.state);
                        console.log('Response for getting unfound thesis list: ', response.data);
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    }); break;
        }
    }
    render() {
        const entireColumns = ["id", "thesisName", "category", "supervisorInStudent", "supervisorsInMET", "assistantSupervisorsInMET"];
        const unfoundColumns = ["id", "thesisName", "supervisorInStudent"];
        return (
            <div className="container" >
                <br />
                <br />
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#entire">All Thesis List</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#unfound">Thesis Not in MET</a>
                    </li>
                </ul>
                <div id="myTabContent" class="tab-content" style={{ borderRadius: "5px", border: "1.5px solid #78c2ad" }}>
                    <div class="tab-pane fade show active" id="entire">
                        <DropdownButton id="dropdown-basic-button" title="Sort by" variant={'danger'}>
                            <Dropdown.Item class="dropdown-item" onClick={this.handleOnClick} id="categorya">Category Ascending</Dropdown.Item>
                            <Dropdown.Item class="dropdown-item" onClick={this.handleOnClick} id="categoryd">Category Descending</Dropdown.Item>
                            <Dropdown.Item class="dropdown-item" onClick={this.handleOnClick} id="supervisora">Supervisor Ascending</Dropdown.Item>
                            <Dropdown.Item class="dropdown-item" onClick={this.handleOnClick} id="supervisord">Supervisor Descending</Dropdown.Item>
                            <Dropdown.Item class="dropdown-item" onClick={this.handleOnClick} id="thesisa">Thesis Name Ascending</Dropdown.Item>
                            <Dropdown.Item class="dropdown-item" onClick={this.handleOnClick} id="thesisd">Thesis Name Descending</Dropdown.Item>
                            <Dropdown.Item class="dropdown-item" onClick={this.handleOnClick} id="ida">ID Ascending</Dropdown.Item>
                            <Dropdown.Item class="dropdown-item" onClick={this.handleOnClick} id="idd">ID Descending</Dropdown.Item>
                        </DropdownButton>
                        <Table thesisList={this.state.entireThesisList} columns={entireColumns} />
                    </div>
                    <div class="tab-pane fade" id="unfound">
                        <DropdownButton id="dropdown-basic-button" title="Sort by" variant={'danger'}>
                            <Dropdown.Item class="dropdown-item" onClick={this.handleOnClick} id="supervisora1">Supervisor Ascending</Dropdown.Item>
                            <Dropdown.Item class="dropdown-item" onClick={this.handleOnClick} id="supervisord1">Supervisor Descending</Dropdown.Item>
                            <Dropdown.Item class="dropdown-item" onClick={this.handleOnClick} id="thesisa1">Thesis Name Ascending</Dropdown.Item>
                            <Dropdown.Item class="dropdown-item" onClick={this.handleOnClick} id="thesisd1">Thesis Name Descending</Dropdown.Item>
                            <Dropdown.Item class="dropdown-item" onClick={this.handleOnClick} id="ida1">ID Ascending</Dropdown.Item>
                            <Dropdown.Item class="dropdown-item" onClick={this.handleOnClick} id="idd1">ID Descending</Dropdown.Item>
                        </DropdownButton>
                        <Table thesisList={this.state.unfoundThesisList} columns={unfoundColumns} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ThesisTable;