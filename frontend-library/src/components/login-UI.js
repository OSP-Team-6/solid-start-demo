"use strict";
//@ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
require("./login-UI.css");
var solid_js_1 = require("solid-js");
var solid_auth_logo_png_png_1 = require("/solid-auth-logo.png.png");
var google_png_1 = require("/google.png");
var hide_png_1 = require("/hide.png");
var LoginForm = function () {
    var _a = (0, solid_js_1.createSignal)(null), loginStatus = _a[0], setLoginStatus = _a[1];
    var _b = (0, solid_js_1.createSignal)({
        usernameInput: '',
        passwordInput: '',
    }), loginInput = _b[0], setLoginInput = _b[1];
    // const navigate = useNavigate();
    return (<div class="loginFormContainer">
          <form class="loginBox">
            <div class="login-image">
              <img src={solid_auth_logo_png_png_1.default} alt="solidLogo"/>
            </div>
            <h2 class="signInText">Sign In</h2>

              <input class='form-control' id="usernameInput" type="email" placeholder="Username"/>
            <div class='password-container'>
              <input class='form-control' id="passwordInput" type="password" placeholder="Password"/>
              <img src={hide_png_1.default} alt="hide logo" class='hide-logo'/>
            </div>
            <button class="log-in-button" type="submit">Log In</button>
            <div class="lineBreakContainer">

            </div>
            <button class="google-button" type="button">
              <img src={google_png_1.default} class="google-logo"/>
              Sign in with Google
            </button>
            <div class='newUserLine'>

              <p>New to Solid Auth?</p>

              <a href="#">Create New User</a>

            </div>
          </form>
        </div>);
};
exports.default = LoginForm;
