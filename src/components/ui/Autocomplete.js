import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Autocomplete extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        suggestions: []
    };

    constructor(props) {
        super(props);

        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ""
        };
    }

    onChange = e => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });

        switch (this.props.type) {
            case "company":
                this.props.getCompany(e.currentTarget.innerText);
                break;
            case "location":
                this.props.getLocation(e.currentTarget.innerText);
                break;
            case "Rols":
                this.props.getRol(e.currentTarget.innerText);
                break;
            default:
                break;
        }
    };

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        }
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }

                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div class="no-suggestions">
                        <em>Sin coincidencias!!!</em>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <div className="input-group mb-3 companysSearch">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><i className="fa fa-search"></i></span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={this.props.placeholder}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={userInput}
                    />
                </div>
                {suggestionsListComponent}
            </Fragment>
        );
    }
}

export default Autocomplete;
