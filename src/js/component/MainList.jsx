import React from "react";
import { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const MainList = () => {

    // const [todoList, setToDoList] = useState([]);

    const [myNewList, setMyNewList] = useState([]);

    const [inputValue, setInputValue] = useState("");

    // const [buttonDisplay, setButtonDisplay] = useState("firstButton");

    // let list = todoList.map((x) => x);

    const removeItem = (task) => {
        var itemDeletedList = myNewList.filter((elm, ind) => task.id != elm.id);
        setMyNewList(itemDeletedList);
        fetch('https://playground.4geeks.com/apis/fake/todos/user/Grublux', {
            method: 'PUT', // or 'POST'
            body: JSON.stringify(itemDeletedList), // data can be a 'string' or an {object} which comes from somewhere further above in our application
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(response => console.log('Success:', response))
            .catch(error => console.error(error));
    }


    const markAsDone = (object, ind) => {
        object.done = !object.done;
        var doneArray = [...myNewList];
        doneArray[ind] = object;
        setMyNewList(doneArray);
        fetch('https://playground.4geeks.com/apis/fake/todos/user/Grublux', {
            method: 'PUT', // or 'POST'
            body: JSON.stringify(doneArray), // data can be a 'string' or an {object} which comes from somewhere further above in our application
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(response => console.log('Success:', response))
            .catch(error => console.error(error));
    }


    const addItemNew = (item) => {
        var newArray = [...myNewList];
        newArray.push({ "done": false, "id": newArray.length, "label": item })
        setMyNewList(newArray);

        fetch('https://playground.4geeks.com/apis/fake/todos/user/Grublux', {
            method: 'PUT', // or 'POST'
            body: JSON.stringify(newArray), // data can be a 'string' or an {object} which comes from somewhere further above in our application
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })

            .then(response => console.log('Success:', response))
            .catch(error => console.error(error));


        setInputValue("");

    }


    const deleteAll = () => {
        setMyNewList([{ "done": false, "id": 0, "label": "sample task" }])

        fetch('https://playground.4geeks.com/apis/fake/todos/user/Grublux', {
            method: 'PUT', // or 'POST'
            body: JSON.stringify([{ "done": false, "id": 0, "label": "sample task" }]), // data can be a 'string' or an {object} which comes from somewhere further above in our application
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })

            .then(response => console.log('Success:', response))
            .catch(error => console.error(error));

    }





    useEffect(() => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/Grublux')
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                // Read the response as JSON
                return response.json();
            })
            .then(responseAsJson => {
                // Do stuff with the JSONified response
                setMyNewList(responseAsJson);
                console.log(responseAsJson);
            })
            .catch(error => {
                console.log('Looks like there was a problem: \n', error);
            });
    }, []);





    return (
        <>
            <div className="row d-flex justify-content-center bg-light p-5">
                <div className="col-7 text-center heading"><h1>Amazing ToDo List</h1>
                </div>
                <div className="col-7 bg-light border p-3 fs-4">
                    <input type="text" className="myInput" placeholder="What needs to be done?"
                        onChange={e => setInputValue(e.target.value)} value={inputValue}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                addItemNew(inputValue);
                        }}
                    />
                    <button className="btn deleteAll border-1 nukeButton" style={{ float: "right" }}
                        onClick={() => deleteAll()}
                    ><p><i className="fa-solid fa-radiation"></i> Delete All Items <i className="fa-solid fa-radiation"></i></p></button>
                </div>
                {myNewList.map((elm, ind) => {
                    return (
                        <div className="col-7 bg-light border p-3 fs-4" key={elm.id}>
                            <span style={{ textDecoration: elm.done ? "line-through" : "none" }}>{elm.label}</span>
                            <button className="myButton fs-4"
                                onClick={() => removeItem(elm)}
                            >Remove  X  </button>
                            <button className="doneButton fs-4"
                                onClick={() => markAsDone(elm, ind)}
                            ><span style={{ display: elm.done ? "none" : "inline" }}>Done <i className="fa-solid fa-check"></i></span>
                                <span style={{ display: elm.done ? "inline" : "none" }}>Undo <i className="fa-solid fa-rotate-left"></i></span>
                            </button>

                        </div>
                    )
                })
                }

            </div >
        </>
    );
};

export default MainList;