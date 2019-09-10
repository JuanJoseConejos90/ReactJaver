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
            userInput: ''
        };

        this.search = this.search.bind(this)
    }

    componentDidMount() {
        this.setState({
            userInput: this.props.userInput
        });
      }



    search = (event) => {

        try {

            event.preventDefault();
            const { suggestions } = this.props;
            const filteredSuggestions = suggestions.filter(suggestion => suggestion.Name.toLowerCase().indexOf('') > -1);
            this.setState({
                showSuggestions: true,
                userInput: 'A',
                filteredSuggestions
            });

        } catch (error) {
            console.log(error);
        }
    }

    onChange = e => {

        this.setState({ userInput: e.currentTarget.value });
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;
        const filteredSuggestions = suggestions.filter(suggestion => suggestion.Name.toLowerCase().indexOf(userInput.toLowerCase()) > -1);

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
                this.props.getCompany(e.currentTarget.id);
                break;
            case "location":
                this.props.getLocation(e.currentTarget.id);
                break;
            case "rol":
                this.props.getRol(e.currentTarget.id);
                break;
            case "department":
                this.props.getDepartment(e.currentTarget.id);
                break;
            case "group":
                this.props.getGroup(e.currentTarget.id);
                break;
            case "job":
                this.props.getJob(e.currentTarget.id);
                break;
            case "user":
                this.props.getUser(e.currentTarget.id);
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

    setInput() {
        this.setState({ userInput: this.props.userInput });
    }

    render() {
        const {onChange,onClick,onKeyDown,
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
                                <li className={className} id={suggestion.Id} key={suggestion.Id} onClick={onClick}>
                                    {suggestion.Name}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>Sin coincidencias!!!</em>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <div className="input-group mb-3 companysSearch">
                    <div className="input-group-prepend" data-type="searchFilters" onClick={this.search}>
                        <span className="input-group-text" id="basic-addon1"><i className="fa fa-search"></i></span>
                    </div>
                    <input
                        type="text"
                        id={this.props.idComponent}
                        className="form-control"
                        placeholder={this.props.placeholder}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={this.state.userInput || ''}
                    />
                </div>
                {suggestionsListComponent}
            </Fragment>
        );
    }
}

export default Autocomplete;
