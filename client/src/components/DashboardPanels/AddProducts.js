import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import ReactDropzone from "react-dropzone";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFileAlt } from "@fortawesome/free-solid-svg-icons";

import "react-confirm-alert/src/react-confirm-alert.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      affiliateId: this.props.affiliate._id,
      handlerResponse: undefined,
      submitSuccess: false,
      selectedFile: null,
      loaded: 0,
       fileUploadProgress: 0,
      accepted: [],
      rejected: []
    };

    this.handleProductListSubmit = this.handleProductListSubmit.bind(this);
  }

  handleselectedFile = file => {
    console.log(file);
    this.setState({
      handlerResponse: undefined,
      selectedFile: file
    });
  };

  handleselectedFile = event => {
    const file = event.target.files[0];
    console.log(file);
    this.setState({
      handlerResponse: undefined,
      selectedFile: file,
        fileUploadProgress: 0
    });
  };
  handleProductListSubmit = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile, "foo");
    axios
      .post("/product/addProduct", data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`
        },
        onUploadProgress: progressEvent => {
          if (progressEvent.lengthComputable) {
            const { loaded, total } = progressEvent;
            console.log("loaded: " + loaded);
            console.log("total: " + total);

            const uploadProgress = (loaded * 100) / total;
            this.setState({
              fileUploadProgress: uploadProgress
            });
          }
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          submitSuccess: res.data.success,
          handlerResponse: JSON.stringify(res.data.message)
        });
        if (res.data.success) {
          this.setState({
            // products: this.state.products
          });
        }
      })
      .catch(error => {
        this.setState({
          submitSuccess: error.response.data.success,
          handlerResponse: JSON.stringify(error.response.data.message)
        });
      });
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let { submitSuccess, handlerResponse,fileUploadProgress } = this.state;

    return (
      <div className="form-wrapper profile-form-wrapper">
        <div className="form-header-wrapper">
          <h3 className="form-header">Add products</h3>
        </div>
        <label className="form-label">Product List</label>
        <div className="upload-wrapper">
          <div className="browse-wrapper">
            <button className="browse-button">
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
            className="upload-button"
            onClick={this.handleProductListSubmit}
          >
            Upload
          </button>
        </div>
        {this.state.selectedFile && (
          <div className="uploaded-file-wrapper">
            <FontAwesomeIcon className="uploaded-file-icon" icon={faFileAlt} />

            <div className="uploaded-file-details">
              <span className="uploaded-file-name">
                {this.state.selectedFile.name}
              </span>

              <div className="uploaded-file-progress">
                <span
                  className="uploaded-file-progress-inner"
                  style={{ width: fileUploadProgress+"%"}}
                />
              </div>
              <span className="uploaded-file-size">
                {this.state.selectedFile.size} bytes
              </span>
            </div>
          </div>
        )}
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
export default Profile;
