// React
import React, { Component } from 'react';
// React Components
import { Card, Icon, Image, Container } from 'semantic-ui-react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ContainerBootstrap from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// React Router and axios
import axios from 'axios';
// CSS and images
import object from '../assets/imagedata1.js';

class StatisticsPage extends Component {
    state = {
        numberPerCategory: [],
        numberPerSupervisor: [],
        totalThesisNum: null,
        unfoundThesisNum: null,
        totalCategoryNum: null,
        totalSupervisorNum: null
    };

    componentDidMount() {
        axios.get('http://localhost:5000/api/totalThesisNum')
            .then((response) => {
                this.setState({ totalThesisNum: response.data.totalThesisNum });
            })
            .catch((error) => {
                console.log('Error with getting total thesis number.');
                console.log('Error: ', error.message);
            });

        axios.get('http://localhost:5000/api/unfoundThesisNum')
            .then((response) => {
                this.setState({ unfoundThesisNum: response.data.unfoundThesisNum });
            })
            .catch((error) => {
                console.log('Error with getting unfound thesis number.');
                console.log('Error: ', error.message);
            });

        axios.get('http://localhost:5000/api/numberPerCategory')
            .then((response) => {
                this.setState({ numberPerCategory: response.data });
            })
            .catch((error) => {
                console.log('Error with getting number per category.');
                console.log('Error: ', error.message);
            });

        axios.get('http://localhost:5000/api/numberPerSupervisor')
            .then((response) => {
                this.setState({ numberPerSupervisor: response.data });
                console.log(this.state);
            })
            .catch((error) => {
                console.log('Error with getting number per supervisor.');
                console.log('Error: ', error.message);
            });

        axios.get('http://localhost:5000/api/totalCategoryNum')
            .then((response) => {
                this.setState({ totalCategoryNum: response.data.num });
            })
            .catch((error) => {
                console.log('Error with getting total category Number.');
                console.log('Error: ', error.message);
            });

        axios.get('http://localhost:5000/api/totalSupervisorNum')
            .then((response) => {
                this.setState({ totalSupervisorNum: response.data.num });
            })
            .catch((error) => {
                console.log('Error with getting total supervisor number.');
                console.log('Error: ', error.message);
            });
    }

    render() {
        const categoryItems = this.state.numberPerCategory.length ? (this.state.numberPerCategory.map((category, index) => {
            return (
                <Card key={index}>
                    <Image src={object[category.category]} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header >{category.category}</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                        <a style={{ color: "red" }}>
                            <Icon name='book' />
                            {category.num}
                        </a>
                    </Card.Content>
                </Card>
            );
        })) : (<div />);

        const progressStyle = { width: "300px", marginLeft: "25px" };
        const supervisorItems = this.state.numberPerSupervisor.length ? (this.state.numberPerSupervisor.map((supervisor, index) => {
            return (
                <ContainerBootstrap key={index}>
                    <Row>
                        <Col>
                            <strong> {supervisor.supervisor}</strong>
                        </Col>

                        <Col xs={9}>
                            <Row>
                                <Col>
                                    <div class="progress" style={progressStyle}>
                                        <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: supervisor.num / this.state.totalSupervisorNum * 100 }} aria-valuenow={{ width: supervisor.num / this.state.totalSupervisorNum * 100 }} aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </Col>
                                <Col>
                                    {supervisor.num}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br />
                </ContainerBootstrap>)
        })) : (<div />);

        return (
            <div>
            <br/>
                <Jumbotron>
                <ContainerBootstrap className="container">
                    <Row>
                        <Col>
                            <Col>
                                <h2><strong>Total Thesis Number</strong></h2>
                            </Col>
                            <Col>
                                <h3 style={{color: "#54bca4"}}>{this.state.totalThesisNum}</h3>
                            </Col>
                        </Col>

                        <Col>
                            <Col>
                                <h2><strong>Unfound Thesis Number</strong></h2>
                            </Col>
                            <Col>
                                <h3 style={{color: "#54bca4"}}>{this.state.unfoundThesisNum}</h3>
                            </Col>
                        </Col>
                    </Row>
                </ContainerBootstrap>
                </Jumbotron>
                <h3 style={{ margin: "20px" }}>
                    Number of Categories is &nbsp;
                <small class="text-muted">{this.state.totalCategoryNum}</small>
                </h3>
                <Container style={{
                    padding: "20px", borderStyle: "solid", borderBottom: "2px", borderLeft: "2px",
                    borderRight: "2px", borderColor: "blue"
                }}>
                    <Card.Group itemsPerRow={3}>
                        {categoryItems}
                    </Card.Group>
                </Container>
                <h3 style={{ margin: "20px" }}>
                    Number of Supervisors is &nbsp;
                <small class="text-muted">{this.state.totalSupervisorNum}</small>
                </h3>
                <Jumbotron>
                    {supervisorItems}
                </Jumbotron>
            </div >
        );
    }
}

export default StatisticsPage;