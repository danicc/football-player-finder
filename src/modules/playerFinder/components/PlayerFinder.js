import React from "react";
import { Panel } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actions from "../actions";
import { getCurrentPlayers, getErrors, getIsLoading } from "../selectors";
import { headers } from "../constants";
import BasicTable from "./BasicTable";
import SearchForm from "./SearchForm";

export class PlayerFinder extends React.Component {
  componentDidMount() {
    this.props.requestPlayers();
  }

  handleSearch = (name, position, age) => {
    const newFilters = {};
    if (name) newFilters.name = name;
    if (position) newFilters.position = position;
    if (age) newFilters.age = age;
    this.props.filter(newFilters);
  };

  render() {
    const { players, errors, isLoading } = this.props;
    let PanelContent = players.length > 0 && (
      <BasicTable headers={headers} items={players} />
    );
    if (isLoading) {
      PanelContent = <h2>Loading ...</h2>;
    }
    if (errors) {
      PanelContent = <h2>Error ocurrs in players loading</h2>;
    }
    return (
      <div>
        <Panel>
          <Panel.Heading>Football Player Finder</Panel.Heading>
          <Panel.Body>
            <SearchForm handleSearch={this.handleSearch} />
            {PanelContent}
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    players: getCurrentPlayers(state),
    errors: getErrors(state),
    isLoading: getIsLoading(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerFinder);
