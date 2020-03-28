import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Repos from '../repos/Repos';
import PropTypes from 'prop-types'
class User extends Component {
    static propTypes = {
        getRepos: PropTypes.func.isRequired,
        getUser: PropTypes.func.isRequired,
        repos: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,

    }
    componentDidMount() {

        this.props.getUser(this.props.match.params.login);
        this.props.getRepos(this.props.match.params.login);
    }
    render() {
        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            company,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable

        } = this.props.user;
        const { repos } = this.props;
        return (
            <Fragment>
                <Link to='/' className="btn btn-light">Back</Link>
                Hirable:{' '}
                {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" />}
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className="round-img" style={{ width: "150px" }}></img>
                    </div>
                    <div>
                        {bio && <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>}
                        <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
                        <ul>
                            <li>{login && <Fragment><strong>UserName: </strong>{login}</Fragment>}</li>
                            <li>{company && <Fragment><strong>Company: </strong>{company}</Fragment>}</li>
                            <li>{blog && <Fragment><strong>Website: </strong>{blog}</Fragment>}</li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followrs: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-light">Public Repos {public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>
                </div>
                <Repos repos={repos} />
            </Fragment>
        )
    }
}

export default User

