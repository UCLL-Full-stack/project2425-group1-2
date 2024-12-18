import Link from 'next/link';
import React from 'react';
import { HOME_URL, LOGIN_URL } from '@/utils/urls';

enum ButtonType {
    Home = 'home',
    Login = 'login',
}

enum ButtonStatus {
    Active = 'active',
    Inactive = 'inactive',
    CurrentPage = 'currentPage',
}
interface HeaderButtonProps {
    buttonType: ButtonType;
    buttonStatus: ButtonStatus;
}

const sharedClassOptions = 'p-1 rounded';

    const typeOptions = {
        home: {
            text: 'Home',
            class: 'mr-3',
            href: HOME_URL,
        },
        login: {
            text: 'Log in',
            class: '',
            href: LOGIN_URL,
        },
    };

    const statusOptions = {
        active: {
            class: 'shadow-regular bg-danger hover:shadow-success',
            attributes: {},
        },
        inactive: {
            class: 'shadow-button_pressed bg-secondary pointer-events-none',
            attributes: {
                disabled: true,
                tabIndex: -1,
                "aria-disabled": true,
            },
        },
        currentPage: {
            class: 'shadow-button_pressed bg-success pointer-events-none',
            attributes: {
                disabled: true,
                tabIndex: -1,
                "aria-disabled": true,                
            },
        },
    };

const HeaderButton: React.FC<HeaderButtonProps> = ({ buttonType, buttonStatus }) => {
    const buttonClass = `${sharedClassOptions} ${statusOptions[buttonStatus].class} ${typeOptions[buttonType].class}`;
    const buttonAttributes = statusOptions[buttonStatus].attributes;
    const buttonHref = typeOptions[buttonType].href;

    return (
        <Link href={buttonHref} className={buttonClass} {...buttonAttributes}>
            {typeOptions[buttonType].text}
        </Link>
    );
};

export {
    HeaderButton,
    ButtonType,
    ButtonStatus,
};