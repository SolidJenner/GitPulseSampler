import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchInfoRequest, fetchInfoSuccess, fetchInfoFailure } from './infoActions';
import axios from 'axios';

const UserInfoLayout = ({ userinf, loading, error, fetchUserData, user_login }) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchUserData();
    }
  }, []);

  if (loading) {
    return <div className="card">Info loading...</div>
  }

  if (error) {
    return <div className="card">Error: {error}</div>
  }
  return (
    
    <div className="card">
      <div className="card-header">Loaded successfully</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userinf: state.userinf, // Corrected prop name
    loading: state.loading,
    error: state.error,
    login: state.user_login,
  };
};

const mapDispatchToProps = (dispatch, login) => {
    return {
      fetchUserData: () => {
        dispatch(fetchInfoRequest());
        axios
          .get('http://localhost:3001/gitapi/userinfo', { login })
          .then((response) => {
            dispatch(fetchInfoSuccess(response.data));
          })
          .catch((error) => {
            dispatch(fetchInfoFailure(error.message));
          });
      }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserInfoLayout);