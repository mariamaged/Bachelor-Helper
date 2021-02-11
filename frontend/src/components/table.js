import React, { Component } from 'react';

// Reacter Router and axios
// CSS and images
class table extends Component {
    state = {
        expandedRows: []
    };

    handleOnClick = (rowID) => {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowID);

        const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== rowID) :
            currentExpandedRows.concat(rowID);

        this.setState({ expandedRows: newExpandedRows });
        console.log(this.state);
    }

    render() {
        const thesisList = this.props.thesisList;
        const columns = this.props.columns;

        const print = (string) => {
            var result = "";
            for (var i = 0; i < string.length; i++) {
                result += `${string[i]}`;
                if (i < string.length - 1) result += ', ';
                else break;
            }
            return result;
        };

        const columnNames = (column) => {
            switch (column) {
                case 'id': return 'ID';
                case 'thesisName': return 'Thesis Name';
                case 'thesisDescription': return 'Thesis Description';
                case 'supervisorInStudent': return 'Supervisor In Student';
                case 'category': return 'Category';
                case 'categoryDescription': return 'Category Description';
                case 'supervisorsInMET': return 'Supervisors In MET';
                case 'assistantSupervisorsInMET': return 'Assistant Supervisors';
            }
        }

        const updatedThesisList = thesisList.map((thesis, index) => {
            const newThesis = {};
            columns.forEach(column => newThesis[column] = thesis[column]);
            const arrayOfTD = [];
            for (var prop in newThesis) {
                if ((prop === 'supervisorsInMET' || prop === 'assistantSupervisorsInMET') && (newThesis[prop]))
                    arrayOfTD.push(<td>{print(newThesis[prop])}</td>);
                else
                    arrayOfTD.push(<td>{newThesis[prop]}</td>);
            }
            return (<React.Fragment key={index}>{arrayOfTD}</React.Fragment>);
        });

        const thesisDescriptionStyle = {border: "1.5px solid #54bca4", borderRadius: "8px", padding: "5px"};
        const tableItems = updatedThesisList.length ? (updatedThesisList.map((thesis, index) => {
            return (
                <React.Fragment key={index}>
                    {thesisList[index].foundInMET ?
                        <>
                            <tr onClick={() => { this.handleOnClick(index) }} style={{cursor: "grabbing"}}>
                                {thesis}
                            </tr>
                            {this.state.expandedRows.includes(index) &&
                                <tr style={{backgroundColor: "#f2f2f2"}}>
                                    <td colspan="6">
                                        <div>
                                            <span style={thesisDescriptionStyle}>
                                                <strong>Thesis Description:</strong></span>
                                            <div style={{float: "left"}}/>
                                        </div>
                                        <br/>
                                        <div>
                                            {thesisList[index].thesisDescription}
                                        </div>
                                    </td>
                                </tr>
                            }
                        </>
                        : (<tr class="table-dark">{thesis}</tr>)
                    }

                </React.Fragment >)
        })) :
            (<div />);

        const headers = columns.map((column, index) => {
            return (<React.Fragment key={index}><th scope="col">{columnNames(column)}</th></React.Fragment>);
        })

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr className="table-success">
                            {headers}
                        </tr>
                    </thead>
                    <tbody>
                        {tableItems}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default table;