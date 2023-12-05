import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const formFields = [
  { label: 'UserName*', type: 'text', name: 'username' },
  { label: 'fistname', type: 'text', name: 'firstname' },
  { label: 'lastname', type: 'text', name: 'lastname' },
  { label: 'Email*', type: 'text', name: 'email' },
  { label: 'Password*', type: 'password', name: 'password' },
  { label: 'Retype Password*', type: 'password', name: 'confirmPassword' },
];

const SignUpForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
  });

  const [isFormValid, setIsFormValid] = useState(true);

  // Handler for input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const dataToSend = { ...formData }; // removed 'verifyCode' from here
      const response = await axios.post('/api/signup', dataToSend);
      console.log(response);
    } catch (error) {
      console.error('Error during sign up:', error);
      alert('There was an error during sign up.');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center min-h-screen ">
        <div className="max-w-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
          <form onSubmit={handleSubmit} className="flex flex-col m-4 md:m-8 lg:m-12">
            <h1 className="text-2xl text-center pb-8">Create a New Account</h1>

            <div className="my-3">
              {formFields.map((field) => (
                <div key={field.label} className="flex flex-col my-3">
                  <label className="label text-gray-500 text-sm">{field.label}</label>
                  <input
                    type={field.type}
                    className="border p-3 rounded-lg"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    pattern={field.pattern}
                    required={field.required}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className={`bg-blue-400 text-white px-4 py-2 rounded-md mt-4 ${
                isFormValid ? '' : 'cursor-not-allowed opacity-50'
              }`}
              disabled={!isFormValid}
            >
              Next
            </button>

            <div className="flex justify-center gap-1 pt-4">
              <p> Already have an account yet?</p>
              <Link to="/#">
                <span className="text-blue-700">Login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
