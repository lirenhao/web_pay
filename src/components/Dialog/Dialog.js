/**
 * Created by cuitao-pc on 16/5/26.
 */
import React, {PropTypes, Component} from "react";
import s from './Dialog.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const Dialog = (props) => (
  <div className={s.model}>
  <div className={s.model_content}>
    <h1>{props.title}</h1>
    <div><p>{props.message}</p></div>
    <div>{props.btns.map((info, i) => <input className={s.btn} type="button" key={i} defaultValue={info.name} onClick={() => info.onClick()} />)}</div>
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