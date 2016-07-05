/**
 * Created by cuitao-pc on 16/5/26.
 */
import React, {PropTypes, Component} from "react";
import s from './Dialog.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Modal} from 'react-bootstrap';

const Dialog = (props) => (
  <div className={s.model}>
    <div className={s.model_content}>
      <Modal.Header>
        <h4>{props.title}</h4>
      </Modal.Header>
      <Modal.Body><p><b className="text-danger">{props.message}</b></p></Modal.Body>
      <Modal.Footer>{props.btns.map((info, i) =>
        <button className={s.btn} type="button" key={i} onClick={() => info.onClick()}>
          {info.name}</button>
      )}
      </Modal.Footer>
    </div>
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

export default withStyles(s)(Dialog);