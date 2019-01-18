import React from "react";
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

      accepted: [],
      rejected: []
    };

    this.handleOfferListSubmit = this.handleOfferListSubmit.bind(this);
  }

  handleselectedFile = file => {
    this.setState({
      handlerResponse: undefined,
      selectedFile: file
    });
  };

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
    data.append("file",this.state.selectedFile);
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
    let {
      submitSuccess,
      handlerResponse,
      fileUploadProgress,
      fileUploadStats,
      selectedFile,
      fileUploaded
    } = this.state;

    return (
      <div className="form-wrapper profile-form-wrapper">
        <div className="form-header-wrapper">
          <h3 className="form-header">Add Offers</h3>
        </div>
        <p className="form-subheader">
            Upload your store's offers to make them available to your
            customers on Wishwatch.
          </p>
          <div className="prod-instruction-links">
            <a href="/"className="form-link">How to set up offer list .JSON <FontAwesomeIcon className="form-link-icon" icon={faInfoCircle} /></a>
          </div>
        <div className="upload-wrapper">
          <div className="browse-wrapper">
            <button className="btn btn-primary browse-button">
              <FontAwesomeIcon className="browse-icon" icon={faPlus} />
              Add new file
            </button>
            <input
              type="file"
              name="product-list"
              multiple={false}
              accept="application/json"
              onChange={this.handleselectedFile}
              className="browse-button-hidden"
            />
          </div>

          <button
            className="btn btn-secondary"
            onClick={this.handleOfferListSubmit}
          >
            Upload
          </button>
        </div>
        <div
          className={`uploaded-file-wrapper ${
            selectedFile ? "show" : undefined
          }`}
        >
          {fileUploaded === 1 && (
            <FontAwesomeIcon className="uploaded-file-icon" icon={faFileAlt} />
          )}
          {fileUploaded === 2 && (
            <FontAwesomeIcon className="uploaded-file-icon" icon={faCheck} />
          )}
          {fileUploaded === 3 && (
            <FontAwesomeIcon
              className="uploaded-file-icon error"
              icon={faTimes}
            />
          )}
            <div className="uploaded-file-details">
              <span className="uploaded-file-name">{selectedFile ? selectedFile.name : "test"}</span>

              <div className="uploaded-file-progress">
                <span
                  className={`uploaded-file-progress-inner ${
                    fileUploaded === 3 ? "error" : ""
                  }`}
                  style={{ width: fileUploadProgress + "%" }}
                />
              </div>
              <div className="upload-stats">
                <span className="uploaded-file-size">
                {selectedFile ? this.formatBytes(selectedFile.size) : "test"}
                </span>
                <span className="uploaded-file-size">{fileUploadStats}</span>
              </div>
            </div>
        </div>
        {handlerResponse && (
          <p
            className={`handler-response ${
              submitSuccess ? "success" : "error"
            }`}
          >
            {handlerResponse}
          </p>
        )}
      </div>
    );
  }
}
export default AddOffers;
