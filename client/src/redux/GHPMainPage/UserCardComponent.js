import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector, useDispatch  } from 'react-redux';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from './userActions';
import axios from 'axios';

const UserCardComponent = ({ user, loading, error, fetchUser }) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchUser();
    }
  }, []);

  if (loading) {
    return (
        <div className="card">
          <div className="card-header">User Loading...</div>
          <div className="card-body text-center">
            <img className="img-account-profile rounded-circle mb-2 user_avatar" alt="" />
            <div className="card-body">
              <h5 className="card-title">User Loading...</h5>
              <p className="card-text">Nah...</p>
              <p className="card-text">...</p>
            </div>
          </div>
        </div>
      );
  }

  if (error) {
    return (
        <div className="card">
          <div className="card-header">Error</div>
          <div className="card-body text-center">
            <img className="img-account-profile rounded-circle mb-2 user_avatar" alt="" />
            <div className="card-body">
              <h5 className="card-title">Something went wrong</h5>
              <p className="card-text">User not loaded</p>
            </div>
          </div>
        </div>
      );
  }

  return (
    <div className="card">
      <div className="card-header">ID {user.id}</div>
      <Link to={`https://github.com/${user.login}`}>
      <div className="card-body text-center">
        <img className="img-account-profile rounded-circle mb-2 user_avatar" src={user.avatarUrl} alt="" />
        <div className="card-body">
          <h5 className="card-title">{user.login}</h5>
          <p className="card-text">{user.Type}</p>
        </div>
      </div>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => {
      dispatch(fetchUserRequest());
      axios.get('http://localhost:3001/gitapi/random-users')
        .then(response => {
          dispatch(fetchUserSuccess(response.data))
        })
        .catch(error => {
          dispatch(fetchUserFailure(error.message))
        });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCardComponent);