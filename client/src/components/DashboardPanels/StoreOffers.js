import React, { Fragment } from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTimes,
  faFileAlt,
  faAngleUp,
  faAngleDown,
  faCalendarAlt,
  faEllipsisH,
  faCheck,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";

import Moment from "react-moment";
import moment from "moment";

import "react-confirm-alert/src/react-confirm-alert.css";

import ReactTable from "react-table";
import "react-table/react-table.css";

import selectTableHOC from "react-table/lib/hoc/selectTable";
import treeTableHOC from "react-table/lib/hoc/treeTable";
import { product } from "../../reducers/userReducer";
import Ionicon from "react-ionicons";
import CountUp from "react-countup";

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
import Select from "react-select";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";


class StoreOffers extends React.Component {
  constructor(props) {
    super(props);

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

  componentDidMount() {
    if (this.props.storeProducts){
    let offers = [].concat(
      ...this.props.storeProducts.map(({ Offers }) => Offers || [])
    );
    offers = offers.map(item => {
      // using chancejs to generate guid
      // shortid is probably better but seems to have performance issues
      // on codesandbox.io
      const _id = item.Offer;
      return {
        _id,
        ...item
      };
    });
    this.setState({ offers });
  }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      let offers = [].concat(
        ...this.props.products.map(({ Offers }) => Offers || [])
      );
      offers = offers.map(item => {
        // using chancejs to generate guid
        // shortid is probably better but seems to have performance issues
        // on codesandbox.io
        const _id = item.Offer;
        return {
          _id,
          ...item
        };
      });
      this.setState({ offers });
    }
  }

  deleteOffer(offer) {
    this.props.removeOffers(offer);
  }
  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };
  render() {
    const { offers, selectedOption, collapse } = this.state;

    const { products, affiliateStore } = this.props;

    const columns = [
      {
        dataField: "_id",
        text: "Offer ID",
        sort: true,
        filter: textFilter()
      },
      {
        dataField: "product_sku",
        text: "Product SKU",
        sort: true,
        align: "center",
        filter: textFilter()
      },
      {
        dataField: "Link",
        text: "Link",
        sort: true
      },
      {
        dataField: "Created",
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
        dataField: "Updated",
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
        dataField: "status",
        isDummyField: false,
        align: "center",
        text: "Status",
        formatter: (cellContent, row) => {
          return (
            <div className="d-block w-100 text-center">
              <span className="badge badge-success">Active</span>
            </div>
          );
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

    const defaultSorted = [
      {
        dataField: "product_sku",
        order: "asc"
      }
    ];

    return (
      <div className="form-wrapper profile-form-wrapper">
        <Fragment>
          <Card className="mb-3">
            <CardHeader className="card-header-tab z-index-6">
              <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                <i className="header-icon lnr-charts icon-gradient bg-happy-green" />
                Offer List
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
                    <div className="widget-subheading">Total Offers</div>
                    <div className="widget-numbers">
                      {offers ? offers.length : 0}
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
                    <div className="widget-subheading">Active Offers</div>
                    <div className="widget-numbers">0</div>
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
                    <div className="widget-subheading">Inactive Offers</div>
                    <div className="widget-numbers">0</div>
                  </div>
                </div>
              </Col>
            </Row>
            <CardFooter className="text-center d-block p-3">
              <Collapse
                isOpen={this.state.collapse}
              >
                <Row>
                  <Col md="12">
                    <div className="table-responsive">
                      {offers && offers.length && columns ? (
                        <BootstrapTable
                          bootstrap4
                          keyField="_id"
                          data={offers}
                          columns={columns}
                          filter={filterFactory()}
                          defaultSorted={defaultSorted}
                        />
                      ) : (
                        undefined
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
                <span className="mr-1">{`${this.state.collapse ? "Hide" : "View" } Offers`}</span>
              </Button>
            </CardFooter>
          </Card>
        </Fragment>
      </div>
    );
  }
}
function mapStateToProps({ auth, storeProducts }) {
  return { auth, storeProducts };
}
export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(StoreOffers)
);
