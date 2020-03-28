import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }
    handleChange(e) {
        this.setState({
            text: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text === "") {
            this.props.setAlert("Please Enter Something", "light");
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({
                text: ''
            });
        }

    }
    render() {
        const { showClear, clearUsers } = this.props;
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <input type="text" name="text" onChange={this.handleChange}
                        value={this.state.text}
                        placeholder="Search Users..." />
                    <input type="submit" value="Submit" className="btn btn-dark btn-block" />
                </form>
                {this.props.showClear && <button onClick={this.props.clearUsers} className="btn btn-block">Clear</button>}
            </div>
        )
    }
}

export default Search

