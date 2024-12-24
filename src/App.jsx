import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);

  const [inputs, setInputs] = useState({
    id: "",
    jmeno: "",
    age: "",
  });

  //const URL = "http://localhost:3001/users";
  //const URL = "https://fancy-paprenjak-a2c602.netlify.app/api/users";
  const URL = "https://uzivatele-backup-render.onrender.com/users";

  const obnov = () => {
    axios.get(URL).then((response) => {
      setListOfUsers(response.data);
    });
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post(URL, {
        id: inputs.id,
        jmeno: inputs.jmeno,
        age: inputs.age,
      })
      .then((res) => {
        obnov();
        console.log(res.data);
      });

    setInputs({
      id: "",
      jmeno: "",
      age: "",
    });
  };

  const handleChange = (e) => {
    const newData = { ...inputs };
    newData[e.target.id] = e.target.value;
    setInputs(newData);
    console.log(newData);
  };

  const edit = (id, e) => {
    e.preventDefault();
    axios
      .put(`https://uzivatele-backup-render.onrender.com/users/${id}`, {
        id: inputs.id,
        jmeno: inputs.jmeno,
        age: inputs.age,
      })
      .then((res) => {
        obnov();
        console.log(res.data);
      });
  };

  const vymaz = (id, e) => {
    e.preventDefault();
    axios
      .delete(`https://uzivatele-backup-render.onrender.com/users/${id}`)
      .then((res) => {
        obnov();
        console.log(res.data);
      });
  };

  useEffect(() => {
    axios.get(URL).then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="usersList">
        <h2>Seznam uživatelů:</h2>
        {listOfUsers.map((value, key) => {
          return (
            <div className="list" key={value.id}>
              <div className="usersId">{value.id}</div>
              <div className="usersJmeno">{value.jmeno}</div>
              <div className="usersAge">{value.age}</div>
              <button
                className="zmena"
                onClick={(e) => {
                  edit(value.id, e, obnov);
                }}
              >
                Změna
              </button>
              <button
                className="vymaz"
                onClick={(e) => {
                  vymaz(value.id, e, obnov);
                }}
              >
                Vymaž
              </button>
            </div>
          );
        })}
      </div>

      <div className="formular">
        <h2>Vytchoř uživatele:</h2>
        {/* <form onSubmit={(e) => submit(e)}> */}
        <form>
          <div className="formId"></div>
          <label>Id:</label>
          <input
            onChange={(e) => handleChange(e)}
            value={inputs.id}
            id="id"
            type="number"
            placeholder="id"
            name="id"
          />
          <div className="formName"></div>
          <label>User Name:</label>
          <input
            onChange={(e) => handleChange(e)}
            value={inputs.jmeno}
            id="jmeno"
            type="text"
            placeholder="jmeno"
            name="jmeno"
          />
          <div className="formAge"></div>
          <label>Age:</label>
          <input
            onChange={(e) => handleChange(e)}
            value={inputs.age}
            id="age"
            type="number"
            placeholder="věk"
            name="age"
          />
          <div>
            <button className="odesli" onClick={(e) => submit(e, obnov)}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
