import React from "react";
import { connect } from "react-redux";
import { Navigate} from 'react-router-dom';

function PrivateRoute({component: RouteComponent, user})  {
    if (user.length === 0) return <Navigate to="/login" />    
    return <RouteComponent />;
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
