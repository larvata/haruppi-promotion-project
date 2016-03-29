import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';


export default class LoginModal extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    let open = !!props.open;
    let loginFailed = false;
    this.state = { open, loginFailed };
  }

  componentWillReceiveProps(nextProps) {
    let { open } = nextProps;
    let loginFailed = false;
    this.setState({ open, loginFailed });
  }

  handleOpen = () => {
    this.props.toggleDialog({ open: true });
  };

  handleClose = () => {
    this.props.toggleDialog({ open: false });
  };

  handleLogin = () =>{
    let uid = this.refs.uid.getValue();
    let tid = this.refs.tid.getValue();
    let self = this;

    const parseJSON =(response)=>{
      console.log('parse response json');
      return response.json();
    };

    fetch(
      '/api/login',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid,
          tid,
          hello: 'hhh'
        })
      }
    )
    .then(parseJSON)
    .then((data)=>{
      console.log(data);
      if (data.result === 'ok') {
        let user = data.user;
        console.log('login success;', user);
        self.props.userLogin(user);
      }
      else {
        console.log('login failed');
        self.setState({ loginFailed: true });
      }
    }).catch(error=>{
      console.log('request fail');
      console.log(error);
    })
  }

  render() {
    let { loginFailed } = this.state;

    const actions = [
      <FlatButton
        label="登录"
        primary={true}
        onTouchTap={this.handleLogin}
      />,

      <FlatButton
        label="关闭"
        onTouchTap={this.handleClose}
      />

    ];

    return (
      <div>
        <Dialog
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
            <TextField ref="tid"
              hintText="输入任意淘宝订单交易号"
            />
            <TextField ref="uid"
              hintText="输入淘宝ID"
            /><br/>
            {loginFailed&&<span style={{ color: 'red' }}>登录信息不正确</span>}
            <br />

        </Dialog>
      </div>
    );
  }
}