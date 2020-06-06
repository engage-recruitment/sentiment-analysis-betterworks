import React, { useState, useEffect } from "react";

const USERS_API = `${process.env.REACT_APP_API_BASE_URL}/api/users`;

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(`${USERS_API}`, { signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error getting users");
      })
      .then((data) => setUsers(data.users))
      .catch((err) => console.error(err));

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <table>
      <tbody>
        {users.map((user) => (
          <>
            <tr>
              <td>{user.user}</td>
              <td>{user.location}</td>
              <td>{user.designation}</td>
              <td>{user.department}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <table>
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>Vote</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.votes.map((vote) => (
                      <tr>
                        <td>{vote.questionId}</td>
                        <td>{vote.vote}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </>
        ))}
        <tr>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default UsersList;
