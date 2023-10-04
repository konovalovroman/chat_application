import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Row, Col, FormCheck } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../services/auth/authService';
import { AxiosError } from 'axios';

interface SignUpValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const initialValues: SignUpValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password must contain letters and numbers'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values: SignUpValues) => {
    try {
      const { username, password } = values;
      await signUp({ username, password });
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Registration</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className={`form-control ${
                      touched.username && errors.username ? 'is-invalid' : ''
                    }`}
                  />
                  {touched.username && errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      className={`form-control ${
                        touched.password && errors.password ? 'is-invalid' : ''
                      }`}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                  {touched.password && errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className={`form-control ${
                      touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''
                    }`}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>

                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  Submit
                </Button>

                {errorMessage && (
                <div className="text-danger mt-2">{errorMessage}</div>
                )}

                <div className="mt-3">
                  <p>
                    Already registered?{' '}
                    <Link to="/signin">Log in here</Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;