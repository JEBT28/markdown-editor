import React, { useState } from "react";
import { EyeIcon, EyeOffIcon, ArrowSmDownIcon } from "@heroicons/react/solid";


export const Login = ({ setSession }) => {
  const [inputType, setType] = useState("password");
  const [userValue, setUserValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [credentialsIsOk, setIsCredentialsOk] = useState(true);

  let dataResponse = {};

  const changeType = (evt) => {
    evt.preventDefault();
    setType(inputType === "text" ? "password" : "text");
  };

  const handleUserChange = (evt) => {
    setUserValue(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPasswordValue(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const dataSend = { user: userValue, password: passwordValue };

      const data = await fetch("http://localhost/php-md-api/login.php",{
        method: 'POST', 
        body: JSON.stringify(dataSend),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then( (res) => res.text());
      
    dataResponse = await JSON.parse(data);  
    
    if(dataResponse.code===5)
    {
      setIsCredentialsOk(false);
    }
    else
    {
      window.localStorage.setItem('sessid',dataResponse.sessid);
      setSession(dataResponse.sessid);
    }          
    console.log(dataResponse);
 
  };

  return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-900">
        <div className="box-border flex flex-col items-center w-full h-full p-8 bg-white shadow-lg sm:h-auto sm:w-auto sm:rounded-lg">
          <div className="flex items-center mb-4 space-x-2">
            <div className="w-[85px] h-[50px] bg-gray-900 rounded-md grid grid-cols-2">
              <div className="flex items-center justify-end">
                <h3 className="text-4xl font-extrabold text-white">M</h3>
              </div>
              <div className="flex items-center text-white jusitfy-start">
                <ArrowSmDownIcon />
              </div>
            </div>
            <h3 className="text-4xl font-extrabold ">EDITOR</h3>
          </div>
          <form action="" method="get" onSubmit={(evt) => handleSubmit(evt)}>
            <h3 className="text-2xl font-semibold text-center font-poppins">
              Iniciar sesión
            </h3>
            <p className="font-medium text-red-500 bg-red-200 ">

            </p>
            <div className="flex flex-col mt-4 space-y-2 font-semibold">
              <label htmlFor="user">Usuario</label>
              <input
                type="text"
                className={ credentialsIsOk? "rounded focus:border-gray-900 focus:ring-gray-900":"rounded focus:border-red-500 focus:ring-red-500 bg-red-200"}
                id="user"
                placeholder="Ingresa tu nombre de usuario..."
                value={userValue}
                onChange={(evt) => handleUserChange(evt)}
              />
            </div>
            <div className="flex flex-col mt-4 space-y-2 font-semibold">
              <label htmlFor="password">Contraseña</label>
              <div className="relative">
                <input
                  type={inputType}
                  className={ credentialsIsOk? "rounded w-full pr-12 focus:border-gray-900 focus:ring-gray-900":"rounded w-full pr-12  focus:border-red-500 focus:ring-red-500 bg-red-200"}
                  id="password"
                  placeholder="Ingresa tu contraseña..."
                  value={passwordValue}
                  onChange={(evt) => handlePasswordChange(evt)}
                />
                <button
                  type="button"
                  onClick={(evt) => changeType(evt)}
                  className={`absolute w-6 h-6 pt-[.12rem] cursor-pointer top-2 right-3 focus:outline-none ${credentialsIsOk?"text-gray-900":"text-red-500"}`}
                >
                  {inputType === "text" ? (
                    <EyeOffIcon className="w-full h-auto" />
                  ) : (
                    <EyeIcon className="w-full h-auto" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 font-semibold text-white bg-gray-900 rounded-md focus:outline-none hover:focus:bg-blue-800"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
  );
};
