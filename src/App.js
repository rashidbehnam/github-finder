import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import utility from './utility';
import './App.css';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Spinner from './components/layout/Spinner';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    showClear: false,
    alert: null
  }


  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get(`https:/api.github.com/users?client_id=${utility.Id}&client_secret=${utility.Secret}`);
    this.setState({ users: res.data, loading: false });
  }

  searchUsers = async (text) => {
    this.setState({ loading: true });

    const res = await axios.get(`https:/api.github.com/search/users?q=${text}&client_id=${utility.Id}&client_secret=${utility.Secret}`);
    this.setState({ users: res.data.items, loading: false, showClear: true });
  }
  //Get Single User
  getUser = async (userName) => {
    this.setState({ loading: true });

    const res = await axios.get(`https:/api.github.com/users/${userName}?client_id=${utility.Id}&client_secret=${utility.Secret}`);
    this.setState({ user: res.data, loading: false });
  }
  //Get User Repos
  getRepos = async (userName) => {
    this.setState({ loading: true });

    const res = await axios.get(`https:/api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${utility.Id}&client_secret=${utility.Secret}`);
    this.setState({ repos: res.data, loading: false });
  }
  clearUsers = () => {
    this.setState({ users: [], showClear: false });
  }
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  }
  render() {

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path="/" render={props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={this.state.showClear}
                    setAlert={this.setAlert} />
                  {this.state.loading ? <Spinner /> : <Users users={this.state.users} />}
                </Fragment>
              )} />
              <Route exact path='/About' component={About} />
              <Route exact path='/User/:login' render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  user={this.state.user}
                  loading={this.state.loading}
                  repos={this.state.repos}
                  getRepos={this.getRepos}
                />
              )} />

            </Switch>



          </div>

        </div>
      </Router>
    );

  }
}

export default App;
