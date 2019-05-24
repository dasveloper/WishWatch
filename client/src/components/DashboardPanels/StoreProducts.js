import React,{Fragment} from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import ProductDetails from "../ProductDetails";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faTimes,
  faFileAlt
} from "@fortawesome/free-solid-svg-icons";

import Moment from "react-moment";
import moment from "moment";

import ReactTable from "react-table";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import {
  Row,
  Col,
  Collapse,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  UncontrolledButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ListGroupItem,
  ListGroup
} from "reactstrap";
import "react-confirm-alert/src/react-confirm-alert.css";

class StoreProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOption: null,
      collapse: false,
      products: [],
      offers: undefined,
      columns: undefined,
      selection: [],
      selectAll: false,
      selectType: "checkbox",
      pivotBy: ["product_sku"],
      expanded: {}
    };
  }
  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };
  render() {
    let { data, collapse } = this.state;
    const defaultSorted = [
      {
        dataField: "product_sku",
        order: "asc"
      }
    ];

    const columns = [
      {
        dataField: "sku",
        text: "SKU",
        sort: true,
        filter: textFilter()
      },
      {
        dataField: "image_url",
        text: "Image URL",
        sort: true,
        align: "center",
        formatter: (cellContent, row) => {
          return (
            <div className="product-image-wrapper">
              <img className="product-image" src={cellContent} alt="" />
            </div>
          );
        }
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
        align: "center"
      },
      {
        dataField: "createdAt",
        text: "Created",
        sort: true,
        align: "center",
        formatter: (cellContent, row) => {
          return moment(cellContent)
            .local()
            .format("MM-DD-YYYY hh:mm a");
        }
      },
      {
        dataField: "updatedAt",
        text: "Updated",
        sort: true,
        align: "center",
        formatter: (cellContent, row) => {
          return moment(cellContent)
            .local()
            .format("MM-DD-YYYY hh:mm a");
        }
      },
      {
        dataField: "actions",
        isDummyField: true,
        align: "center",
        text: "Actions",
        formatter: (cellContent, row) => {
          return (
            <div>
              <div className="d-block w-100 text-center">
                <UncontrolledButtonDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon btn-icon-only btn btn-link"
                    color="link"
                  >
                    <i className="lnr-menu-circle btn-icon-wrapper" />
                  </DropdownToggle>
                  <DropdownMenu
                    right
                    className="rm-pointers dropdown-menu-hover-link"
                  >
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem>
                      <i className="dropdown-icon lnr-inbox"> </i>
                      <span>Menus</span>
                    </DropdownItem>
                    <DropdownItem>
                      <i className="dropdown-icon lnr-file-empty"> </i>
                      <span>Settings</span>
                    </DropdownItem>
                    <DropdownItem>
                      <i className="dropdown-icon lnr-book"> </i>
                      <span>Actions</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.deleteOffer(row)}>
                      <i className="dropdown-icon lnr-trash"> </i>
                      <span>Delete</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
            </div>
          );
        }
      }
    ];
    let { products, affiliateStore } = this.props;
    console.log(products);
    return (
      <div className="form-wrapper profile-form-wrapper">
        <Fragment>
          <Card className="mb-3">
            <CardHeader className="card-header-tab z-index-6">
              <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                <i className="header-icon lnr-charts icon-gradient bg-happy-green" />
                Product List
              </div>
            </CardHeader>
            <Row className="no-gutters">
              <Col sm="6" md="4" xl="4">
                <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                  <div className="icon-wrapper rounded-circle">
                    <div className="icon-wrapper-bg opacity-10 bg-warning" />
                    <i className="lnr-list text-dark opacity-8" />
                  </div>
                  <div className="widget-chart-content">
                    <div className="widget-subheading">Total Products</div>
                    <div className="widget-numbers">
                      {products ? products.length : 0}
                    </div>
                  </div>
                </div>
                <div className="divider m-0 d-md-none d-sm-block" />
              </Col>
              <Col sm="6" md="4" xl="4">
                <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                  <div className="icon-wrapper rounded-circle">
                    <div className="icon-wrapper-bg opacity-9 bg-success" />
                    <i className="lnr-checkmark-circle text-white" />
                  </div>
                  <div className="widget-chart-content">
                    <div className="widget-subheading">Version</div>
                    <div className="widget-numbers">
                      {affiliateStore.prodListVersion}
                    </div>
                  </div>
                </div>
                <div className="divider m-0 d-md-none d-sm-block" />
              </Col>
              <Col sm="12" md="4" xl="4">
                <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                  <div className="icon-wrapper rounded-circle">
                    <div className="icon-wrapper-bg opacity-9 bg-danger" />
                    <i className="lnr-cross-circle text-white" />
                  </div>
                  <div className="widget-chart-content">
                    <div className="widget-subheading">Last Updated</div>
                    <div className="widget-numbers">
                      <Moment fromNow>{affiliateStore.prodListUpdated}</Moment>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <CardFooter className="text-center d-block p-3">
              <Collapse isOpen={this.state.collapse}>
                <Row>
                  <Col md="12">
                    <div className="table-responsive">
                      {products && products.length && (
                        <BootstrapTable
                          bootstrap4
                          keyField="_id"
                          data={products}
                          columns={columns}
                          filter={filterFactory()}
                          defaultSorted={defaultSorted}
                        />
                      )}
                    </div>
                  </Col>
                </Row>
              </Collapse>
              <Button
                color="primary"
                className="btn-pill btn-shadow btn-wide fsize-1"
                size="lg"
                onClick={this.toggle}
              >
                <span className="mr-1">{`${
                  this.state.collapse ? "Hide" : "View"
                } Offers`}</span>
              </Button>
            </CardFooter>
          </Card>
        </Fragment>
      </div>
    );
  }
}
export default StoreProducts;
