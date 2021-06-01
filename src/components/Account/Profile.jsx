import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../css/styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const API_USERS_URL = `http://localhost:4000/api/users`;

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        phone: '',
        address: ''
    })
    const [errorText, setErrorText] = useState('');

    const fetchUser = () => {
        if(localStorage.getItem('userID')) {
            const userID = JSON.parse(localStorage.getItem('userID'));
            axios.get(API_USERS_URL + `/${userID}`).then(res => {
                setUser(res.data);
            })
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const updateInfo = (e) => {
        e.preventDefault();
        console.log(user);
        axios.put(API_USERS_URL + `/${user.id}`, user).then(() => {
            toast.success('Update info successfully!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }

    const changePassword = (e) => {
        e.preventDefault();
        if(user.current === user.password) {
            if(user.new === user.confirm) {
                user.password = user.confirm;
                delete user.current;
                delete user.new;
                delete user.confirm;
                axios.put(API_USERS_URL + `/${user.id}`, user).then(() => {
                    toast.success('Change password successfully!', {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
            }
            else {
                setErrorText('Confirm password not matched!');
            }
        }
        else {
            setErrorText('Current password is incorrect!');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <main id="main" className="mt-70">
            <div className="container">
                <div className="profile">
                    <form onSubmit={updateInfo} className="profile__form">
                        <div className="header">Contact Details</div>
                        <div className="form-control">
                            <span>Name</span>
                            <input type="text" name="name" value={user.name} placeholder="Name" onChange={(e) => {handleChange(e); setErrorText('');}} required/>
                        </div>
                        <div className="form-control">
                            <span>Phone</span>
                            <input type="text" name="phone" value={user.phone} placeholder="Phone" onChange={(e) => {handleChange(e); setErrorText('');}} required/>
                        </div>
                        <div className="form-control">
                            <span>Address</span>
                            <textarea type="textarea" name="address" value={user.address} placeholder="Address" onChange={(e) => {handleChange(e); setErrorText('');}} required/>
                        </div>
                        <div>
                            <button type="submit" className="btn__update">Update</button>
                        </div>
                    </form>
                    
                    <form onSubmit={changePassword} className="profile__form">
                        <div className="header">Password</div>
                        <div className="form-control1">
                            <span>Current Password</span>
                            <input type="password" name="current" placeholder="Current password" onChange={(e) => {handleChange(e); setErrorText('');}} required/>
                        </div>
                        <div className="form-control1">
                            <span>New Password</span>
                            <input type="password" name="new" placeholder="New password" onChange={(e) => {handleChange(e); setErrorText('');}} required/>
                        </div>
                        <div className="form-control1">
                            <span>Confirm Password</span>
                            <input type="password" name="confirm" placeholder="Confirm password" onChange={(e) => {handleChange(e); setErrorText('');}} required/>
                        </div>
                        <div className="error-text">{errorText}</div>
                        <div>
                            <button type="submit" className="btn__update">change</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
export default Profile;