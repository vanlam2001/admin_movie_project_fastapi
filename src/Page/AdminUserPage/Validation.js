import { message } from 'antd';
import { isLength } from 'validator';
import { isEmail } from 'validator';
import { equals } from 'validator';
import validator from 'validator';


export const checkPassword = (passwords) => {
    let checkPassword = false;

    const isValidPassword = isLength(passwords.trim(), { min: 4 });

    if (isValidPassword) {
        checkPassword = true;
    } else {
        message.error('Mật khẩu ít nhất 4 ký tự trở lên')
    }

    return checkPassword;
}

export const repeatPassword = (password, repeatPassword) => {
    let checkPassword = false;
    const isValidPassword = equals(password, repeatPassword);

    if (isValidPassword) {
        checkPassword = true;
    } else {
        message.error('Mật khẩu không khớp');
    }
    return checkPassword;
}

export const checkEmail = (email) => {
    let checkMail = false;

    if (isEmail(email)) {
        const domain = email.split('@')[1].toLowerCase();
        if (domain === 'gmail.com' || domain === 'yahoo.com' || domain === 'hotmail.com') {
            checkMail = true;
        } else {
            message.error('Email không đúng định dạng')
        }
    } else {
        message.error('Email không hợp lệ')
    }

    return checkMail;
}

export const checkPhoneVietNam = (phone) => {
    let flag = false;

    if (validator.isMobilePhone(phone, 'vi-VN')) {
        flag = true;
    } else {
        message.error('Số điện thoại không hợp lệ!');
    }

    return flag;
}

