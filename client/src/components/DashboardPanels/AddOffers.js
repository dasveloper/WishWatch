import React, { Fragment } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faTimes,
  faFileAlt,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import "react-confirm-alert/src/react-confirm-alert.css";
import PageTitle from "../PageTitle";

import Dropzone from "react-dropzone";
import { Progress } from "react-sweet-progress";

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

class AddOffers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handlerResponse: undefined,
      submitSuccess: false,
      selectedFile: null,
      loaded: 0,
      fileUploadProgress: 0,
      fileUploadStats: "",
      fileUploaded: 1,
      files: [],

      accepted: [],
      rejected: [],
      collapse: false
    };

    this.handleOfferListSubmit = this.handleOfferListSubmit.bind(this);
  }
  onDrop(files) {
    this.setState({ files });
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  handleselectedFile = event => {
    const file = event.target.files[0];
    this.setState({
      handlerResponse: undefined,
      selectedFile: file,
      fileUploadProgress: 0
    });
  };

  formatBytes = (bytes, decimals) => {
    if (bytes == 0) return "0 Bytes";
    var k = 1024,
      dm = decimals <= 0 ? 0 : decimals || 2,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  handleOfferListSubmit = () => {
    const data = new FormData();
    data.append("file", this.state.files[0]);
    data.append("storeId", this.props.affiliateStore.id);
    axios
      .post("/store/addOffers", data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`
        },
        onUploadProgress: progressEvent => {
          if (progressEvent.lengthComputable) {
            let { loaded, total } = progressEvent;
            const uploadProgress = (loaded * 100) / total;

            loaded = this.formatBytes(loaded);
            total = this.formatBytes(total);
            const fileUploadStats =
              loaded === total ? `Saving changes..` : `${loaded}/${total}`;

            this.setState({
              fileUploadStats: fileUploadStats,
              fileUploadProgress: uploadProgress
            });
          }
        }
      })
      .then(res => {
        this.setState({
          submitSuccess: res.data.success,
          handlerResponse: JSON.stringify(res.data.message)
        });
        if (res.data.success) {
          this.setState({
            fileUploaded: 2,
            fileUploadStats: "Success"

            //products: this.state.products
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          fileUploaded: 3,
          fileUploadStats: "Error uploading",
          submitSuccess: error.response.data.success,
          handlerResponse: JSON.stringify(error.response.data.message)
        });
      });
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const files = this.state.files.map(file => (
      <ListGroupItem key={file.name}>
        {file.name} - {file.size} bytes
      </ListGroupItem>
    ));
    let {
      submitSuccess,
      handlerResponse,
      fileUploadProgress,
      fileUploadStats,
      selectedFile,
      fileUploaded,
      collapse
    } = this.state;

    return (
      <Fragment>
        <Row className="mb-3">
          <Col>
            <PageTitle
              heading="Analytics Dashboard"
              subheading={
                <Fragment>
                  <p>
                    Upload your store's offers to make them available to your
                    customers on Wishwatch.<br/>
                    <a href="/">
                      How to set up offer list .JSON{" "}
                      <FontAwesomeIcon
                        className="form-link-icon"
                        icon={faInfoCircle}
                      />
                    </a>{" "}
                  </p>
                </Fragment>
              }
              icon="pe-7s-car icon-gradient bg-mean-fruit"
            />
          </Col>
        </Row>
        {handlerResponse && (
          <p
            className={`handler-response ${
              submitSuccess ? "success" : "error"
            }`}
          >
            {handlerResponse}
          </p>
        )}
        <Card className="mb-3">
          <CardHeader className="card-header-tab z-index-6">
            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
              <i className="header-icon lnr-charts icon-gradient bg-happy-green" />
              Add Offers
            </div>
          </CardHeader>

          <CardBody className="text-center d-block p-3">
            <Row>
              <Col>
                <div className="dropzone-wrapper dropzone-wrapper-md">
                  <Dropzone
                    multiple={false}
                    onDrop={this.onDrop.bind(this)}
                    onFileDialogCancel={this.onCancel.bind(this)}
                    accept="application/json"
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="dropzone-content">
                          <p>
                            Try dropping some files here, or click to select
                            files to upload.
                          </p>
                          <ListGroup>{files}</ListGroup>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardFooter className="text-center d-block p-3">
            <Row className="align-items-center">
              <Col className="flex-grow-1">
                <Progress
                  percent={fileUploadProgress}
                  theme={this.props.theme}
                  width={this.props.width}
                  strokeWidth={this.props.strokeWidth}
                />
              </Col>
              <Col className="col-auto flex-shrink-1">
                <Button
                  color="primary"
                  className="btn-shadow btn-wide fsize-1"
                  size="lg"
                  disabled={files.length === 0}
                  onClick={this.handleOfferListSubmit}
                >
                  <span className="mr-1">Upload</span>
                </Button>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </Fragment>
    );
  }
}
export default AddOffers;
