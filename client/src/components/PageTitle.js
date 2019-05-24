import React, {Component} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';


class PageTitle extends Component {
    randomize(myArray) {
        return myArray[Math.floor(Math.random() * myArray.length)];
    }

    render() {
        let {
            enablePageTitleIcon,
            enablePageTitleSubheading,

            heading,
            icon,
            subheading
        } = this.props;


        return (

            <div className="app-page-title">
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        <div
                            className={cx("page-title-icon")}>
                            <i className={icon}/>
                        </div>
                        <div>
                            {heading}
                            <div
                                className={cx("page-title-subheading")}>
                                {subheading}
                            </div>
                        </div>
                    </div>
                    <div className="page-title-actions">
                     
                    </div>
                </div>
            </div>
        );
    }
}



export default PageTitle;