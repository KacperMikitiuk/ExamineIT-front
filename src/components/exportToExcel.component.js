import React, { Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class ExportToExcel extends Component{

    render(){
        return(
            <div style={{marginRight: '25px'}}>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="export"
                    table="table-to-xls"
                    filename="filtredData"
                    sheet="tablexls"
                    buttonText="Export"/>
                <table hidden={true} id="table-to-xls">
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>x</th>
                        <th>y</th>
                        <th>z</th>
                        <th>a</th>
                        <th>b</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.items.map(item => {
                            return(
                                <tr key={item.id}>
                                    <td>{item.time }</td>
                                    <td>{item.x }</td>
                                    <td>{item.y }</td>
                                    <td>{item.z }</td>
                                    <td>{item.a }</td>
                                    <td>{item.b }</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>

            </div>
        )
    }
}
export default ExportToExcel;