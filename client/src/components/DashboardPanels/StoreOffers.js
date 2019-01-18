import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import OfferDetails from "../OfferDetails";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faTimes,
  faFileAlt
} from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import moment from 'moment'

import "react-confirm-alert/src/react-confirm-alert.css";

import ReactTable from "react-table";
import "react-table/react-table.css";

import selectTableHOC from "react-table/lib/hoc/selectTable";
import treeTableHOC from "react-table/lib/hoc/treeTable";
import { product } from "../../reducers/userReducer";

const SelectTreeTable = selectTableHOC(treeTableHOC(ReactTable));

// const CheckboxTable = checkboxHOC(ReactTable);
let curIndex = 0;

function getNodes(data, node = []) {
  data.forEach(item => {
    if (item.hasOwnProperty("_subRows") && item._subRows) {
      node = getNodes(item._subRows, node);
    } else {
      node.push(item._original);
    }
  });
  return node;
}
const ignoreColumns = ['_id'];

class StoreOffers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

  getColumns(offers) {
    const columns = [];
    const sample = offers[0];
    for (let key in sample) {
      if (ignoreColumns.includes(key)) continue;

      if (key  === 'Updated' || key === 'Created') {
        columns.push({
          id: key,
          Header: key,
          style: { whiteSpace: "normal" },
          accessor: d => {
            return moment(d.updated_at)
              .local()
              .format("MM-DD-YYYY hh:mm a");
          }
        });
      } else {
        columns.push({
          accessor: key,
          Header: key,
          style: { whiteSpace: "normal" }
        });
      }
    }

    //const expanded = offers.map(x => true);

    this.setState({ columns, offers });
  }
  componentDidMount() {
    let offers = [].concat(
      ...this.props.storeProducts.map(({ Offers }) => Offers || [])
    );
    offers = offers.map((item) => {
      // using chancejs to generate guid
      // shortid is probably better but seems to have performance issues
      // on codesandbox.io
      const _id = item.Offer;
      return {
        _id,
        ...item,
      }
    })
    this.getColumns(offers);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      
      let offers = [].concat(
        ...this.props.products.map(({ Offers }) => Offers || [])
      );
      offers = offers.map((item) => {
        // using chancejs to generate guid
        // shortid is probably better but seems to have performance issues
        // on codesandbox.io
        const _id = item.Offer;
        return {
          _id,
          ...item,
        }
      })
      this.getColumns(offers);
    }
  }

  toggleSelection = (key, shift, row) => {
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };
  toggleAll = () => {
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.selectTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we need to get all the 'real' (original) records out to get at their IDs
      const nodes = getNodes(currentRecords);
      // we just push all the IDs onto the selection array
      nodes.forEach(item => {
        selection.push(item._id);
      });
    }
    this.setState({ selectAll, selection });
  };
  isSelected = key => {
    return this.state.selection.includes(key);
  };
  logSelection = () => {
    this.props.removeOffers(this.state.selection);

  };

  onExpandedChange = expanded => {
    this.setState({ expanded });
  };
  hasOffers(product) {
    return product.Offers && product.Offers.length > 0;
  }

  render() {
    const {
      toggleSelection,
      toggleAll,
      isSelected,
      logSelection,
      onExpandedChange
    } = this;
    const { data, columns, selectAll, selectType, pivotBy, expanded, offers } = this.state;
console.log(offers);
    const extraProps =
      {
        selectAll,
        isSelected,
        toggleAll,
        toggleSelection,
        selectType,
        pivotBy,
        expanded,
        onExpandedChange,
      }

    const { products, affiliateStore } = this.props;

    return (
      <div className="form-wrapper profile-form-wrapper">
        <div className="form-header-wrapper">
          <h3 className="form-header">Offer List</h3>
        </div>
        <div className="prod-list-stats">
          <div className="prod-list-stat-block">
            <label className="form-label">
              Offers
              <p className="form-item">{offers ? offers.length : 0}</p>
            </label>
          </div>
        </div>
        {!offers ||
          (!offers.length && (
            <label className="form-label">
              <p className="form-item">No offers found</p>
            </label>
          ))}

        <div style={{ padding: "10px" }}>
          <button onClick={logSelection}>Log Selection to Console</button>
          {` (${this.state.selection.length}) selected`}
          {offers &&  offers.length && columns ? (
            <SelectTreeTable
              data={offers}
              showPagination={false}
              columns={columns}
              defaultPageSize={undefined}
              ref={r => (this.selectTable = r)}
              className="-striped -highlight"
              {...extraProps}
              freezWhenExpanded={true}
            />
          ) : null}
        </div>

      </div>
    );
  }
}
function mapStateToProps({ auth, stores, affiliateStore, storeProducts }) {
  return { auth, stores, affiliateStore, storeProducts };
}
export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(StoreOffers)
);
