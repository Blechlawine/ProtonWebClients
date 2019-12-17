import React from 'react';
import PropTypes from 'prop-types';

const ContactsLogo = ({ planName = '', className = 'logo' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-labelledby="logo__title plan"
            width="148"
            height="36"
        >
            <g>
                <path d="M22.368 11.989H18.75v13.323h2.277v-4.704h1.363a6.116 6.116 0 003.695-1.024 3.987 3.987 0 001.524-3.38c0-2.72-1.86-4.215-5.241-4.215zm-1.343 1.885h1.324c1.958 0 2.87.746 2.87 2.349a2.292 2.292 0 01-.768 1.973c-.642.39-1.391.565-2.14.5h-1.288l.002-4.822zM33.974 14.779a2.74 2.74 0 00-2.448 1.483l-.11-1.259H29.46v10.312h2.22v-5.83c.39-1.768 1.016-2.521 2.083-2.521.268-.001.535.035.793.11l.263.066.412-2.177-.235-.058a4.503 4.503 0 00-1.022-.126zM40.389 14.779a4.299 4.299 0 00-3.438 1.52 6.842 6.842 0 00-.008 7.752 4.654 4.654 0 006.847-.038 6.868 6.868 0 00.016-7.749 4.268 4.268 0 00-3.417-1.485zm-.018 8.869c-1.53 0-2.274-1.138-2.274-3.482a4.763 4.763 0 01.615-2.695 1.898 1.898 0 011.68-.807c.653-.04 1.28.265 1.651.804a4.78 4.78 0 01.602 2.68c.005 2.354-.746 3.5-2.274 3.5zM51.728 23.221c-.344.241-.75.377-1.169.39-.579 0-.917-.196-.917-1.193v-5.591h2.106l.258-1.83h-2.364V12.55l-2.22.265V15h-1.71v1.83h1.71v5.658a3.135 3.135 0 00.767 2.256 2.826 2.826 0 002.123.788 4.005 4.005 0 002.339-.714l.192-.13-.894-1.61-.221.143zM57.775 14.779a4.3 4.3 0 00-3.438 1.52 6.843 6.843 0 00-.008 7.752 4.654 4.654 0 006.848-.038 6.868 6.868 0 00.015-7.749 4.269 4.269 0 00-3.417-1.485zm-.019 8.869c-1.528 0-2.274-1.138-2.274-3.482a4.766 4.766 0 01.615-2.695 1.899 1.899 0 011.68-.807c.653-.04 1.28.265 1.651.804a4.78 4.78 0 01.602 2.68c.006 2.354-.744 3.5-2.273 3.5zM69.564 14.779a3.64 3.64 0 00-1.856.495c-.355.208-.675.47-.949.776l-.11-1.047h-1.952v10.312h2.22v-7.138c.692-1.085 1.363-1.547 2.236-1.547.774 0 1.29.279 1.29 1.645v7.041h2.22v-7.283a3.363 3.363 0 00-.817-2.37 3.012 3.012 0 00-2.282-.884zM83.08 22.508a4.056 4.056 0 01-2.561 1.028 2.76 2.76 0 01-2.31-1.088 6.226 6.226 0 01-.967-3.808c0-3.216 1.141-4.914 3.297-4.914a3.539 3.539 0 012.312.892l.195.157 1.299-1.523-.206-.164a5.33 5.33 0 00-3.711-1.315 5.143 5.143 0 00-3.942 1.774 7.642 7.642 0 00-1.633 5.102 7.77 7.77 0 001.574 5.102 5.122 5.122 0 004.038 1.791 5.217 5.217 0 003.849-1.51l.153-.162-1.181-1.503-.205.14zM89.757 14.779a4.3 4.3 0 00-3.438 1.52 6.842 6.842 0 00-.008 7.752 4.654 4.654 0 006.848-.038 6.868 6.868 0 00.015-7.749 4.261 4.261 0 00-3.417-1.485zm-.017 8.869c-1.53 0-2.274-1.138-2.274-3.482a4.763 4.763 0 01.615-2.695 1.899 1.899 0 011.68-.807c.653-.04 1.28.265 1.65.804a4.78 4.78 0 01.603 2.68c.005 2.354-.743 3.5-2.274 3.5zM101.55 14.779a3.64 3.64 0 00-1.855.495c-.355.208-.676.47-.95.776l-.109-1.047h-1.954v10.312h2.221v-7.138c.692-1.085 1.363-1.547 2.236-1.547.774 0 1.29.279 1.29 1.645v7.041h2.22v-7.283a3.366 3.366 0 00-.818-2.37 3.02 3.02 0 00-2.281-.884zM111.995 23.221a2.16 2.16 0 01-1.168.39c-.58 0-.917-.196-.917-1.193v-5.591h2.105l.258-1.83h-2.364V12.55l-2.22.265V15h-1.711v1.83h1.71v5.658a3.135 3.135 0 00.767 2.256 2.826 2.826 0 002.124.788 4.006 4.006 0 002.337-.714l.192-.13-.893-1.61-.22.143zM121.405 22.767v-4.482a3.472 3.472 0 00-.912-2.575 3.818 3.818 0 00-2.785-.935 9.846 9.846 0 00-3.473.685l-.236.086.59 1.72.24-.079c.823-.299 1.686-.47 2.56-.507 1.288 0 1.79.469 1.79 1.68v.468h-1.252a5.523 5.523 0 00-3.332.878 3.104 3.104 0 00-1.236 2.61c-.03.866.3 1.704.91 2.318a3.464 3.464 0 002.47.896 3.618 3.618 0 002.85-1.212 2.243 2.243 0 001.958 1.206l.207.023.53-1.622-.229-.084c-.37-.129-.65-.294-.65-1.074zm-4.276.973c-.967 0-1.437-.495-1.437-1.51a1.503 1.503 0 01.577-1.302 3.18 3.18 0 011.881-.452h1.028v1.93a2.24 2.24 0 01-2.046 1.334h-.003zM128.308 16.7a2.843 2.843 0 011.924.708l.206.163 1.142-1.522-.187-.155a4.604 4.604 0 00-3.157-1.12c-2.754 0-4.533 2.144-4.533 5.461a5.872 5.872 0 001.206 3.872 4.214 4.214 0 003.323 1.425 4.913 4.913 0 003.154-1.135l.183-.15-1.108-1.586-.212.161a2.953 2.953 0 01-1.947.748 1.885 1.885 0 01-1.628-.748 4.431 4.431 0 01-.626-2.623 4.714 4.714 0 01.63-2.688c.367-.534.984-.84 1.63-.81zM137.713 23.221a2.16 2.16 0 01-1.168.39c-.579 0-.916-.196-.916-1.193v-5.591h2.105l.258-1.83h-2.364V12.55l-2.22.265V15h-1.711v1.83h1.71v5.658c-.05.824.225 1.634.768 2.256a2.827 2.827 0 002.124.788 4.006 4.006 0 002.338-.714l.19-.13-.892-1.61-.222.143z" />
                <path d="M145.84 20.14a5.956 5.956 0 00-2.504-1.133c-1.623-.42-1.91-.767-1.91-1.332 0-.632.594-1.028 1.55-1.028a3.873 3.873 0 012.382.845l.22.156 1.02-1.557-.189-.142a5.491 5.491 0 00-3.484-1.17 4.455 4.455 0 00-2.68.812 2.631 2.631 0 00-1.109 2.121 2.58 2.58 0 00.76 1.928 5.193 5.193 0 002.388 1.184c.641.12 1.254.36 1.807.707.281.228.426.584.383.944 0 .715-.724 1.176-1.846 1.176a3.837 3.837 0 01-2.549-.924l-.192-.163-1.283 1.46.194.169a5.7 5.7 0 003.865 1.345 5.056 5.056 0 002.824-.768 2.861 2.861 0 001.3-2.465 2.719 2.719 0 00-.947-2.164zM12.099 10.005H1.465a1.45 1.45 0 00-1.468 1.426v12.593a1.45 1.45 0 001.425 1.468h10.67a1.45 1.45 0 001.467-1.425V11.473a1.509 1.509 0 00-1.46-1.468zm-3.854 4.582h.008a1.155 1.155 0 011.192 1.118v.075a1.239 1.239 0 11-2.476 0 1.234 1.234 0 011.275-1.199l.001.006zm-5.311 9.99H1.468a.579.579 0 01-.46-.549V11.473a.432.432 0 01.463-.459h1.465v13.563h-.002zm7.973-3.939a.295.295 0 01-.275.277H5.775a.295.295 0 01-.275-.277v-.459a2.293 2.293 0 012.2-2.2H8.71a2.232 2.232 0 012.2 2.2l-.002.46z" />
            </g>
            <title id="logo__title">ProtonContacts</title>
            {planName ? (
                <text
                    textAnchor="end"
                    className={`plan fill-${planName} uppercase bold`}
                    x="147"
                    y="42"
                    id="plan"
                    focusable={false}
                >
                    {planName}
                </text>
            ) : null}
        </svg>
    );
};

ContactsLogo.propTypes = {
    planName: PropTypes.string,
    className: PropTypes.string
};

export default ContactsLogo;
