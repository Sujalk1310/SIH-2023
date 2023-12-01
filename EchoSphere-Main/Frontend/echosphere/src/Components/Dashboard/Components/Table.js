import React, { Component } from "react";
import '../public/Styles.css';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  componentDidMount() {
    // $(() => {
    //   $('#table').bootstrapTable()
    // })
  }

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    const { data } = this.props;
    const { searchQuery } = this.state;

    // Check if data is null or not yet loaded
    if (data === null) {
      return (
        <main className="w-75 tab mx-auto">
          <p>Loading data...</p>
        </main>
      );
    }

    // Filter the data based on the searchQuery
    const filteredData = data.filter((item) =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

    return (
      <main className="w-75 tab mx-auto">
        <div className="d-flex align-items-center justify-content-end bg-light">
          <label className="mr-1 mt-1" htmlFor="search">Search: </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={this.handleSearch}
            className="my-4 mr-4"
          />
        </div>
        <table
          className="table"
          id="example"
          data-filter-control="true"
        >
          <thead>
            <tr>
              <th data-field="Date" data-filter-control="select">
                Date
              </th>
              <th>Grievance ID</th>
              <th>Worker ID</th>
              <th>Location</th>
              <th data-field="Priority" data-filter-control="select">
                Priority
              </th>
              <th data-field="Department" data-filter-control="select">
                Department
              </th>
              <th>Status</th>
              <th>Stage</th>
            </tr>
          </thead>

          <tbody id="tableBody">
            {filteredData.map((item) => (
              <tr key={item.gid}> {/* Added a unique key */}
                <td>{item.date}</td>
                <td>{item.gid}</td>
                <td>{item.wid}</td>
                <td>{item.location}</td>
                <td>{item.priority}</td>
                <td>{item.dept}</td>
                <td>{item.status}</td>
                <td>{item.stage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    );
  }
}

export default Table;
