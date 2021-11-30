import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import "../App.css";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    }
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'bottom',
  }

  render() {
    console.log("chart data")
    console.log(this.state.chartData)
    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          options={{
            scales: {
              xAxis:{
              title: {
                display: true,
                text: 'Time',
                fontSize: 25
              },
              legend: {
                display: true,
              }
            },
            yAxis:{
              title: {
                display: true,
                text: 'Value',
                fontSize: 25
              },
              legend: {
                display: true,
              }
            }
          }
          }
        }
        />
      </div>
    )
  }
}

export default Chart;