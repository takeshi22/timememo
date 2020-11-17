import * as React from "react";
import { useState } from "react";
import Validation from '../Validate'

interface Iinfo{
  email: string;
  password: string;
}

export const Login = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  } as Iinfo);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setInfo({
      ...info,
      [name]: value,
    });
  };


    return(
        <form>
          <div>
            <input
              type="text"
              name="email"
              defaultValue=""
              className="input"
              onChange={handleChange}
            />
          </div>
    
          <div>
            <input
              autoComplete="off"
              type="password"
              name="password"
              defaultValue=""
              className="input"
              onChange={handleChange}
            />
          </div>
    
          <button
            type="submit"
            className="submit">ログイン
          </button>
        </form>
    );
};