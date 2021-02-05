import React, { Component, Suspense } from "react";
import Tabs from "../../Tabs/Tabs";
import SimpleTable from "../../SimpleTable/SimpleTable";
import Tab from "../../Tab/Tab";

import PaginatorService from "../../../services/PaginatorService";

class PageUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div className=" ">
        <div className="flex  flex-col bg-white h-screen rounded-t-lg">
          <div className="text-center">
            // Here we calling Simle table Table and Passing Our API in
            standardDataFormatPromise parameter
            <SimpleTable
              dataKey={"uid"}
              className="text-sm text-primary text-left align-text-top"
              standardDataFormatPromise={PaginatorService.getUser}
              row={3}
            >
              <Tab
                field="id"
                header="User ID"
                style={{ width: "120px" }}
                className="text-center"
                headerClassName="text-white text-center border-r-2 border-white"
              ></Tab>

              <Tab
                field="email"
                header="Emal"
                style={{ width: "120px" }}
                className="text-center"
                headerClassName="text-white text-center border-r-2 border-white"
              ></Tab>
              <Tab
                field="first_name"
                header="First Name"
                style={{ width: "120px" }}
                className="text-center"
                headerClassName="text-white text-center border-r-2 border-white"
              ></Tab>
            </SimpleTable>
          </div>
        </div>
      </div>
    );
  }
}

export default PageUserProfile;
