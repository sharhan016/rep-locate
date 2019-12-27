class Login extends Component {

  static navigationOptions = ({ navigation }) => ({
    "title": "Login"
  });

  constructor(props) {

    super(props);
    this.state = {}

  }


  // onLoginPressed will trigger the authentication workflow with the remote server.

  onLoginPressed() {

    const { email, password } = this.state;

    if (this.state.isEmailValid && this.state.isPasswordValid) {

      axios.post(api.LOGIN_URL, {
        username: email,
        password: password,
        type: value
      }).then(response => {

        const navigationParams = {
          baseUrl: response.data.url,
          token: response.data.token,
          username: email
        }

        //this.props.dispatch(loginSuccess(navigationParams));

        // Adding retrieved values to AsyncStorage
        AsyncStorage.multiSet(
          [
            [IS_USER_LOGGED_IN, "YES"],
            [USER, email],
            [TOKEN, response.data.token],
            [BASE_URL, response.data.url]
          ],
          () => {
            this.props.navigation.navigate("WebApp", navigationParams);
          });

      }).catch(error => {

        console.error(error);
        ToastAndroid.show("Authentication Failed", ToastAndroid.SHORT);

      });

    }

  }

  // Updating the state key email
  onEmailTextChanged(text) {
    this.setState({ "email": text });
  }

  // Updating the state key password
  onPasswordTextChanged(text) {
    this.setState({ "password": text });
  }

  onEmailTextBlurred() {

    var text = this.state.email;
    console.warn(text);

    if (text == undefined || text.trim().length == 0) {
      this.setState({ "isEmailValid": false });
      this.setState({ "emailErrorMessage": "Email cannot be empty" });
    }
    else {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      var isEmailValid = regex.test(text);
      if (!isEmailValid) {
        this.setState({ "isEmailValid": false });
        this.setState({ "emailErrorMessage": "Email is incorrect." });
      }
      else {
        this.setState({ "isEmailValid": true });
      }
    }

  }

  onPasswordTextBlurred() {

    var text = this.state.password;

    if (text == undefined || text.trim().length == 0) {
      this.setState({ "isPasswordValid": false });
      this.setState({ "passwordErrorMessage": "Password cannot be empty" });
    }
    else {
      this.setState({ "isPasswordValid": true });
    }

  }

  // rendering the LoginForm (presentational component) corresponding to this container component
  render() {
    return (
      <LoginForm
        onLoginPressed={() => this.onLoginPressed()}
        onEmailTextChanged={(text) => this.onEmailTextChanged(text)}
        onPasswordTextChanged={(text) => this.onPasswordTextChanged(text)}
        onEmailTextBlurred={() => this.onEmailTextBlurred()}
        onPasswordTextBlurred={() => this.onPasswordTextBlurred()}
      />
    )
  }

}

const mapStateToProps = (state) => {

  return state;

}


const mapDispatchToProps = (dispatch) => {

  const boundActionCreators = bindActionCreators(loginSuccess, dispatch);
  return { ...boundActionCreators, dispatch };

}


export default connect(mapStateToProps, mapDispatchToProps)(Login);