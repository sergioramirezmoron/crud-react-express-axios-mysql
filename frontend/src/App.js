import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function App() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState();
  const [workersList, setWorkersList] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getWorkers();
  }, []);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      experience: experience,
    })
      .then(() => {
        getWorkers();
        removeFields();
        Swal.fire({
          title: `Empleado Registrado: ${name}`,
          icon: "success",
          draggable: true,
          timer: 3000,
        });
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo ha salido mal!",
        });
      });
  };

  const getWorkers = () => {
    Axios.get("http://localhost:3001/workers").then((response) => {
      setWorkersList(response.data);
    });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      name: name,
      age: age,
      country: country,
      position: position,
      experience: experience,
    })
      .then(() => {
        getWorkers();
        Swal.fire({
          title: "Usuario actualizado",
          icon: "success",
          draggable: true,
          timer: 3000,
        });
        removeFields();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo ha salido mal!",
        });
      });
  };

  const editWorker = (value) => {
    setEdit(true);
    setId(value.id);
    setName(value.name);
    setAge(value.age);
    setCountry(value.country);
    setPosition(value.position);
    setExperience(value.experience);
  };

  const deleteWorker = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${id}`)
          .then(() => {
            getWorkers();
            Swal.fire({
              title: "Eliminado correctamente!",
              text: "El trabajador ha sido eliminado con éxito.",
              icon: "success",
              timer: 3000,
            });
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Algo ha salido mal!",
            });
          });
      }
    });
  };

  const removeFields = () => {
    setEdit(true);
    setId("");
    setName("");
    setAge("");
    setCountry("");
    setPosition("");
    setExperience("");
    setEdit(false);
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTION DE EMPLEADOS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              onChange={(event) => {
                setName(event.target.value);
              }}
              value={name}
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad:
            </span>
            <input
              onChange={(event) => {
                setAge(event.target.value);
              }}
              value={age}
              type="number"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              País:
            </span>
            <input
              onChange={(event) => {
                setCountry(event.target.value);
              }}
              value={country}
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Puesto:
            </span>
            <input
              onChange={(event) => {
                setPosition(event.target.value);
              }}
              value={position}
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Experiencia:
            </span>
            <input
              onChange={(event) => {
                setExperience(event.target.value);
              }}
              value={experience}
              type="number"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {edit ? (
            <div>
              <button className="btn btn-warning m-2" onClick={update}>
                Actualizar
              </button>
              <button onClick={removeFields} className="btn btn-info">
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={add}>
              Registrar
            </button>
          )}
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Puesto</th>
            <th scope="col">Experiencia</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {workersList.map((worker) => {
            return (
              <tr>
                <th scope="row">{worker.id}</th>
                <td>{worker.name}</td>
                <td>{worker.age}</td>
                <td>{worker.country}</td>
                <td>{worker.position}</td>
                <td>{worker.experience}</td>
                <td>
                  <button
                    onClick={() => {
                      editWorker(worker);
                    }}
                    type="button"
                    className="btn btn-info"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      deleteWorker(worker.id);
                    }}
                    type="button"
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
