import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { data, useLoaderData } from 'react-router-dom'
import Swal from 'sweetalert2';
function App() {
  const getUsers = useLoaderData();
  

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const password = form.password.value;
    const user = { name, phone, email, phone };



    if (!name || !email || !phone || !password) {
      Swal.fire({
        title: 'Error!',
        text: 'All fields must be filled out.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return; // Prevent the form from being submitted
    }

    // Email validation (basic check)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Phone number validation (basic check)
    const phonePattern = /^[0-9]{11}$/; // Adjust regex based on your phone number format
    if (!phonePattern.test(phone)) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a valid phone number.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          alert('Successfully Inserted');
          window.location.reload();
          form.reset();


        }
      })
  }
  const handleDeleteUser = _id => {


    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {

        fetch(`http://localhost:5000/users/${_id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            window.location.reload();
            console.log(data);

          })

      } else {
        Swal.fire('Cancelled', 'File was not deleted', 'error');
      }
    });

    // const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    // if (isConfirmed) {

    // } else {
    //   alert('Item was not deleted.');
    // }

  }
  return (

    <>
      <h1>USER CREATE</h1>
      <form onSubmit={handleAddUser}>
        <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
          <div class="card-body">
            <label class="fieldset-label">Name</label>
            <input type="text" name='name' class="input" placeholder="Name" />

            <label class="fieldset-label">Email</label>
            <input type="email" name='email' class="input" placeholder="Email" />

            <label class="fieldset-label">Phone</label>
            <input type="text" name='phone' class="input" placeholder="Phone" />

            <label class="fieldset-label">Password</label>
            <input type="password" name='password' class="input" placeholder="Password" />

            <button class="btn btn-neutral mt-4">ADD USER</button>
          </div>
        </div>
      </form>


      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              {/* <th>Password</th> */}
            </tr>
          </thead>
          <tbody>
            {getUsers.map(user =>
              <tr key={user._id}>
                <th>{user._id}</th>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                {/* <td>{user.password}</td> */}
                <td>
                  <button onClick={() => handleDeleteUser(user._id)}
                    className="btn btn-soft btn-error mr-1">Delete</button>
                     <button class="btn btn-dash btn-primary">Update</button>
                </td>
              </tr>

            )}
          </tbody>

        </table>
      </div>

    </>
  )
}

export default App
