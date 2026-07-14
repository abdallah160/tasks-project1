import './App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from 'react';
function App() {
  const [items, setItems] = useState([]);

  let inputRef = useRef();

  function toggleCheck(keyToUpdate) {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === keyToUpdate) {
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      })
    );
  };
  let numOfCheckedItems = 0;
  for (let item of items) {
    if (item.isChecked) numOfCheckedItems++;
  }
  function handleRemoveChecked() {
    setItems((prev) => prev.filter(item => !item.isChecked))
  }

  function handleInputSubmit() {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: inputRef.current.value,
        isChecked: false
      }
    ]
    )
  }

  function handleTaskDeletion(recievedID) {
    setItems((prev) => prev.filter(item => item.id != recievedID));
  }


  return (
    <div id="outer">
      <div id="centered">
        <h1>
          TO DO LIST
        </h1>
        <input type="text" id='insertion-input' ref={inputRef} />
        <button id="insertion-button" onClick={handleInputSubmit}>+</button>
        <div id='all-items'>
          {
            items.map(item => {
              return (
                <div key={item.id}>
                  <hr />
                  <div className='list-item'>
                    <input type="checkbox" checked={item.isChecked} onChange={() => toggleCheck(item.id)} />
                    {!item.isChecked ? <p id="item-title">{item.title}</p> : <del id="item-title">{item.title}</del>}
                    <div id='buttons'>
                      <button /*TODO: onClick={() => handleTaskEdit(item.id)}*/><FontAwesomeIcon icon={faPen} /></button>
                      <button onClick={() => handleTaskDeletion(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div id="bottom-items">
          <div id="progress">
            <div id="progress-bar" style={{ "width": `${numOfCheckedItems / /*maybe 0*/ items.length * 100}%` }}></div>
            <p id="inner-text" >{numOfCheckedItems} out of {items.length}</p>
          </div>
          <button onClick={handleRemoveChecked}>Remove Checked</button>

        </div>
      </div>
    </div>

  )
}

export default App
