import React, { useState } from "react";
import { EyeIcon, EyeOffIcon, ArrowSmDownIcon } from "@heroicons/react/solid";

export const Login = ({ setSesion }) => {
  const [inputType, setType] = useState("password");
  const [userValue, setUserValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const changeType = (evt) => {
    evt.preventDefault();
    setType(inputType === "text" ? "password" : "text");
  };

  const handleUserChange = (evt) => {
    setUserValue(evt.target.value);
    console.log(userValue);
  };

  const handlePasswordChange = (evt) => {
    setPasswordValue(evt.target.value);
    console.log(passwordValue);
  };

  const handleSubmit = async (evt) => {
    const dataSend = {
      method: "POST",
      body: {
        user: userValue,
        password: passwordValue,
      },
    };

    const data = await fetch(
      "http://localhost/php/login.php",
      dataSend
    ).then((res) => res.json()).catch(e => alert(e))

    alert(data.msg);
    console.log(data);

    evt.preventDefault();
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-700">
      <div className="box-border flex flex-col items-center w-full h-full p-8 bg-white shadow-lg md:h-auto md:w-auto md:rounded-lg">
        <div className="flex items-center mb-4 space-x-2">
          <div className="w-[85px] h-[50px] bg-blue-700 rounded-md grid grid-cols-2">
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
          <div className="flex flex-col mt-4 space-y-2 font-semibold">
            <label htmlFor="user">Usuario</label>
            <input
              type="text"
              className="rounded"
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
                className="w-full pr-12 rounded "
                id="password"
                placeholder="Ingresa tu contraseña..."
                value={passwordValue}
                onChange={(evt) => handlePasswordChange(evt)}
              />
              <button
                type="button"
                onClick={(evt) => changeType(evt)}
                className="absolute w-6 h-6 pt-[.12rem] text-blue-700 cursor-pointer top-2 right-3 focus:outline-none"
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
            className="w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-md focus:outline-none hover:focus:bg-blue-800"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};
