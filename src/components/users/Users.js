import React from 'react';
import UserItem from './UserItem'

const Users = ({ users }) => {
    return (<div style={myStyle}>
        {users.map(user => (
            <UserItem key={user.id} user={user} />
        ))}
    </div>);
}
const myStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gridGap: "1rem"
}
export default Users;
