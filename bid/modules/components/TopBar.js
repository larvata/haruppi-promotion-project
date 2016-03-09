import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import RaisedButton from 'material-ui/lib/raised-button';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import TextField from 'material-ui/lib/text-field';


export default class TopBar extends React.Component {
  static propTypes = {
    name: React.PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  onClickAbout() {
    this.props.toggleAboutDialog({ open: true });
  }

  onSearchTermChange(event) {
    this.props.searchTermChanged(event.target.value);
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup float="right" lastChild={true}>
          <RaisedButton label="登录" primary={true} />
        </ToolbarGroup>

        <ToolbarGroup float="right" >
          <RaisedButton label="关于" secondary={true} onClick={this.onClickAbout.bind(this)}/>
        </ToolbarGroup>

        <ToolbarGroup float="right" firstChild={true} >
          <TextField ref="uid" hintText="按成员姓名搜索" style={{ padding: 2 }} onChange={this.onSearchTermChange.bind(this)}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
