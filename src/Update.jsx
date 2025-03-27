import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

const Update = () => {
    const lodedUser = useLoaderData();
    const navigate =useNavigate()
    const handleUpdateUser = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const password = form.password.value;
        const update_user = { name, phone, email, phone, password };
        console.log(update_user);
        fetch(`http://localhost:5000/users/${lodedUser._id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(update_user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert('Successfully Updated');
                    navigate('/');  
                } else {
                    alert('No changes were made.');
                }
                <Link to={`/`}></Link>
            })
    }

    return (
        <div>
            <h2>Update user </h2>
            <form onSubmit={handleUpdateUser} >
                <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
                    <div class="card-body">
                        <label class="fieldset-label">Name</label>
                        <input defaultValue={lodedUser.name} type="text" name='name' class="input" placeholder="Name" />

                        <label class="fieldset-label">Email</label>
                        <input defaultValue={lodedUser.email} type="email" name='email' class="input" placeholder="Email" />

                        <label class="fieldset-label">Phone</label>
                        <input defaultValue={lodedUser.phone} type="text" name='phone' class="input" placeholder="Phone" />

                        <label class="fieldset-label">Password</label>
                        <input defaultValue={lodedUser.password} type="password" name='password' class="input" placeholder="Password" />

                        <button class="btn btn-neutral mt-4">UPDATE USER</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Update;