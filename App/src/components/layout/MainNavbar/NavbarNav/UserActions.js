import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
} from 'shards-react';
// import "../../assets/quill.css";
import { dbConnection } from '../../../../utils/axios-api';
// import {dbConnection} from '../../../utils/axios-api';
import { API_URL, METHOD_TYPE } from '../../../../utils/constants';
import { getUser, setUser } from '../../../../utils/user-info';

import '../../../../assets/custom.css';
const UserActions = () => {
  const [visible, setVisible] = useState(false);
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     visible: false
  //   };

  //   this.toggleUserActions = this.toggleUserActions.bind(this);
  // }
  // console.log("props",props);
  const [navigateValue, setNavigate] = useState(false);
  const [userInformation, setUserInformation] = useState({});
  const [fetchingData, setFetchingData] = useState(true);
  const [profilePic, setProfilePic] = useState('');

  const toggleUserActions = () => {
    // this.setState({
    //   visible: !this.state.visible
    // });
    setVisible(!visible);
  };

  const userInfo = getUser();
  console.log('getUser', getUser());
  useEffect(() => {
    if (!localStorage.getItem('userTokenTime')) {
      setNavigate(true);
      return;
    }
    if (Object.keys(userInfo).length === 0) {
      const userId = JSON.parse(localStorage.getItem('userTokenTime')).userId;
      console.log('userId', userId);
      const makeApi = dbConnection(
        METHOD_TYPE.GET,
        `${API_URL.GET_USER_INFO}`,
        {},
        {}
      );
      makeApi
        .then((data) => {
          if (data?.status === 200) {
            // SetgetResponse(true);
            console.log('data', data);
            setFetchingData(false);
            setUserInformation(data.data);
            setUser(data.data);
            const firstName = data.data.firstName.trim().substr(0, 1);
            const lastName = data.data.lastName.trim().substr(0, 1);
            const combineName = (firstName + lastName).toUpperCase();
            setProfilePic(combineName);
            // setNavigate(true);
          }
        })
        .catch((err) => {
          console.log('error', err);
        });
    }
    if (Object.keys(userInfo).length > 0) {
      setFetchingData(false);
      setUserInformation(userInfo);
      // setUser(data.data);
      const firstName = userInfo.firstName.trim().substr(0, 1);
      const lastName = userInfo.lastName.trim().substr(0, 1);
      const combineName = (firstName + lastName).toUpperCase();
      setProfilePic(combineName);
    }
    // }
    // else{

    // }
  }, [userInfo]);

  // render() {
  // var intials;
  // var fullName = "Mahendren Manoharan"
  // intials = fullName.split(' ').map(name =>name[0]).join('').toUpperCase();
  // console.log('intials',intials);
  //  - check here your output

  return (
    <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
      <DropdownToggle
        caret
        tag={NavLink}
        className='text-nowrap px-3'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/0.jpg")}
            alt="User Avatar"
          />{" "} */}
        <div id='profileImage'>{profilePic}</div>

        {/* <span className="d-none d-md-inline-block">Test User</span> */}
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible}>
        <DropdownItem tag={Link} to='edit-user-profile'>
          <i className='material-icons'>&#xE7FD;</i> Profile
        </DropdownItem>
        {/* <DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem> */}
        {/* <DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem> */}
        {/* <DropdownItem tag={Link} to="transaction-history">
            <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem> */}
        {/* <DropdownItem divider /> */}
        <DropdownItem tag={Link} to='/logout' className='text-danger'>
          <i className='material-icons text-danger'>&#xE879;</i> Logout
        </DropdownItem>
      </Collapse>
    </NavItem>
  );
};
// }
export default UserActions;
