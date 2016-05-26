/**
 * Created by cuitao-pc on 16/5/26.
 */
import React, {PropTypes, Component} from "react";

const Dialog = (props) => (
  <div>
    <div>{props.title}</div>
    <div>{props.message}</div>
    <div>{props.btns.map((info, i) => <input type="button" key={i} defaultValue={info.name} onClick={() => info.onClick()} />)}</div>
  </div>
);

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  btns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  })).isRequired
};

export default Dialog;