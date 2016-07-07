/**
 * Created by cuitao-pc on 16/5/25.
 */
import React, {PropTypes, Component} from 'react';
import history from '../../core/history';
import Payment from '../../Payment/Payment';
import Const from '../../constants/PaymentConstants';
import {FormGroup, InputGroup, Glyphicon, Button, ButtonGroup} from 'react-bootstrap';
import s from './Login.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const TerminalType = Const.TerminalType;

// function Login({onLogin}, context) {
//   context.setTitle("登录");
//   var self = this;
//   console.log(self);
//   function handleClick() {
//     console.log("click");
//     var id = self.usernameInput.value;
//     var terminalType = this.merRadio.checked ? "MERCHANT" : "USER";
//     onLogin(id, terminalType);
//   }
//   return (
//     <div>
//       <div><label>用户名:</label><input ref={c => this.usernameInput = c} /></div>
//       <div>
//         <label>类型:</label>F
//         <input ref={c => this.merRadio = c} type="radio" name="terminalType" defaultValue="MERCHANT" defaultChecked={true} /> 商户
//         <input type="radio" name="terminalType" defaultValue="USER" /> 用户
//       </div>
//       <div>
//         <input type="button" onClick={console.log} value="登录" />
//       </div>
//     </div>
//   );
// }

class Login extends Component {
	static contextTypes = {
		setTitle: PropTypes.func.isRequired
	};

	componentWillMount() {
		this.context.setTitle("登录");
	}

	render() {
		return (
			<div className={s.myContainer}>
				<div className={s.loginD}>
					<FormGroup bsSize="lg">
						<InputGroup>
							<InputGroup.Addon>
								<Glyphicon glyph="user"/>
							</InputGroup.Addon>
							<label className="sr-only" htmlFor="loginInputID">id</label>
							<input
								id="loginInputID"
								className="form-control"
								type="text"
								placeholder="请输入用户名"
								ref={c => this.usernameInput = c}/>
						</InputGroup>
						<div className={s.btn}>
							<ButtonGroup aria-label="登录类型" data-toggle="buttons" justified>
								<ButtonGroup>
									<Button active>
										<input ref={c => this.merRadio = c} type="radio" name="terminalType" defaultValue="MERCHANT"
													 defaultChecked={true}/> 商户端
									</Button>
								</ButtonGroup>
								<ButtonGroup>
									<Button>
										<input type="radio" name="terminalType" defaultValue="USER"/> 用户端
									</Button>
								</ButtonGroup>
							</ButtonGroup>
						</div>
					</FormGroup>
					<div className={s.btn}>
						<Button bsStyle="info" onClick={e => {
          if(this.merRadio.checked) history.push("/acqOrder"); else history.push("/acqOrderId");
          Payment.setUserProfile({id: this.usernameInput.value, terminalType: this.merRadio.checked ? TerminalType.MERCHANT : TerminalType.USER});
          Payment.clientSignIn();
          }}
										block>登&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
					</div>
				</div>
			</div>
		);
	}
}
export default withStyles(s)(Login);