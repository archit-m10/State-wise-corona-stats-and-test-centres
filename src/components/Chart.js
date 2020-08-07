import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
    this.state = {
      data: []
    };
  }

  componentDidMount = () => {
    fetch(`https://api.rootnet.in/covid19-in/stats/daily`)
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          this.setState({
            data: result
          });
        },
        error => {
          debugger;
        }
      );
    console.log(this.chartReference); // returns a Chart.js instance reference
  };

  render() {
    const lastRefreshed = new Date(
      this.state.data.lastRefreshed
    ).toLocaleDateString();

    let dateData = this.state.data.data;
    let cases = [];
    let dates =
      dateData &&
      dateData.length &&
      dateData.map((aValue, index) => {
        return aValue.day;
      });
    if (
      this.props.locationData.loc === "INDIA" &&
      dateData &&
      dateData.length
    ) {
      cases = dateData.map((aValue, index) => {
        return aValue.summary.total;
      });
    } else if (dateData && dateData.length) {
      let loc = this.props.locationData.loc;
      dateData.forEach((aValue, index) => {
        let regionArray = [];
        aValue.regional.forEach((aRegion, index) => {
          regionArray.push(aRegion[Object.keys(aRegion)[0]]);
        });
        if (regionArray.includes(loc)) {
          cases.push(
            aValue.regional.filter((item, index) => {
              return item.loc === loc;
            })[0].confirmedCasesForeign +
              aValue.regional.filter((item, index) => {
                return item.loc === loc;
              })[0].confirmedCasesIndian
          );
        } else {
          cases.push(0);
        }
      });
    }
    const data = {
      labels: dates,
      datasets: [
        {
          label: `Total Cases`,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#6699ff",
          borderColor: "#6699ff",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgb(255, 0, 0)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: cases
        }
      ]
    };
    return (
      <Bar ref={this.chartReference} data={data} height={100} width={100} />
    );
  }
}

export default Chart;
