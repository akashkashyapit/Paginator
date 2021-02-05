

import { DataTable } from "primereact/datatable";
import React, { Component } from "react";
import emptyIcon from "../../assets/img/Icon_nodata_gray.svg";

class Tbl extends DataTable {
  constructor(props) {
    super(props);
  }
}

class SimpleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: {
        limit: 2,
        loading: false,
        totalRecords: 12,
        start: 1,
        records: [
        ],
        search: "",
      },
    };

    this.getDefaultDataLoaderFunction = this.getDefaultDataLoaderFunction.bind(
      this
    );
    this.search = this.search.bind(this);
    this.emptyMessageRender = this.emptyMessageRender.bind(this);
  }

  search() {
    this.getDefaultDataLoaderFunction();
  }

  componentDidMount() {
    if (this.props.standardDataFormatPromise) {
      this.getDefaultDataLoaderFunction();
    }
  }

  getDefaultDataLoaderFunction(e) {
    if (this.props.customQuery && this.props.runCustomQuery) {
      this.props
        .customQuery(e)
        .then((res) => {
          if (res.data) {
            this.setState({
              dataTable: {
                ...this.state.dataTable,
                loading: false,
                limit: 3,
                records: res.data.data,
                totalRecords: res.data.totalResults,
                start: res.data.start,
                search: "",
                
              },
            });
          } else {
            this.showError(
              "You are unauthorized or might need to log in again.",
              "error"
            );
          }
        })
        .catch((err) => {
          this.setState({
            dataTable: {
              ...this.state.dataTable,
              loading: false,
              records: [],
              start: 0,
              totalRecords: 0,
            },
          });
        });
      return;
    }

    if (this.props.standardDataFormatPromise) {
    } else {
      return;
    }

    var searchParams = {
      start: this.state.dataTable.start,
      limit: this.props.rows,
      search: "",
    };

    if (e) {
      searchParams.start = e.first;
    }

    if (this.props.search) {
      searchParams.search = this.props.search;
    }

    this.setState({
      dataTable: {
        ...this.state.dataTable,
        search: searchParams.search,
        loading: true,
      },
    });
   

    var searchFn =
      this.props.search && this.props.standardDataFormatSearchPromise
        ? this.props.standardDataFormatSearchPromise
        : this.props.standardDataFormatPromise;
    searchFn(searchParams.start, searchParams.limit, searchParams.search)
      .then((res) => {
        if (res.data) {
          console.log("POSTS", res.data.data);
         
         
          this.setState({
            dataTable: {
              ...this.state.dataTable,
              loading: false,
              records: res.data.data,
              totalRecords: 12,
              start: searchParams.start,
              search: searchParams.search,
            },

            
          });
          
        } else {
          this.showError(
            "You are unauthorized or might need to log in again.",
            "error"
          );
        }
      })
      .catch((err) => {
        this.setState({
          dataTable: {
            ...this.state.dataTable,
            loading: false,
            records: [],
            start: 0,
            totalRecords: 0,
          },
        });
      });

     
     
  }

 
  render() {
    if (this.state.dataTable && this.state.dataTable.totalRecords > 0) {
      return (
        <React.Fragment>
          <Tbl
            emptymessage="No Corporate Found"
            emptyimg={emptyIcon}
            value={this.state.dataTable.records}
            rows={2}            
            paginator
            {...this.props}
          ></Tbl>
          
        </React.Fragment>
      );
    } 
  }
}

export default SimpleTable;
