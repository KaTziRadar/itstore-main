/* eslint-disable */
/* the line above disables eslint check for this file (temporarily) todo:delete */
import React from 'react';
import './styles/RegisterStyle.css';
import { useNavigate } from 'react-router-dom';
import { registration } from '../services/authService';
import bcrypt from 'bcryptjs';

function register() {

    const navigate = useNavigate();

    const printErrorMsg = (msg) => {
        document.getElementById('message').textContent = msg;
    }

    const handleSubmit = async () => {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let cnfrmPassword = document.getElementById('cnfrm-password').value;

        const mailValidation = (mail) => {
            const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]+$/;

            if (regex.test(mail))
                return true;
            return false;
        }

        // checking if there are empty fields
        if (!(email && password && cnfrmPassword))
            printErrorMsg("Error! fields can't be empty");

        //checking if passwords match
        else if (password != cnfrmPassword)
            printErrorMsg("Error! passwords not match");

        //checking validation of email
        else if (!mailValidation(email))
            printErrorMsg("Error! email is invalid")

        else {
            printErrorMsg('');

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            /* Packs data to 'JSON' format to send via web */
            const data = {
                email: email,
                password: hashedPassword,
            }
            console.log(JSON.stringify(data));

            const res = await registration(data);
            if (res && res.status == 200)
                navigate('/login');
            else
                printErrorMsg(res);
            console.log(res);
        }


    }

    return (
        <div className='form-div'>
            <h2 className='form-type'>Registration Form</h2>
            <link href="https://font.googleapis.com/css2?family=Poppins:wght@400;500&display=swap" rel="stylesheet"></link>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
            <form className='forms'>

                <div className='reg-div'>
                    <input className='reg-field' type="email" id="email" placeholder="Email" required />
                    <i className='bx bxs-envelope'></i>
                </div>

                <div className='reg-div'>
                    <input className='reg-field' type="password" id="password" placeholder="Password" required />
                    <i className='bx bxs-lock-alt' ></i>
                </div>

                <div className='reg-div'>
                    <input className='reg-field' type="password" id="cnfrm-password" placeholder="Confirm password" required />
                    <i className='bx bxs-lock-alt' ></i>
                </div>

                <p id="message"></p>
                <input type="button" className='btn' onClick={handleSubmit} value='Register'></input>
            </form>
        </div>
    );
}

export default register;