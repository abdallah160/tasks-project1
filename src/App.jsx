import './App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from 'react';
import BottomItems from './components/bottomItems';
function App() {
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(-1);
  const [titleChange, setTitleChange] = useState();
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

  function handleTaskEdit(recievedID) {
    let neededTitle;
    for (let item of items) {
      if (item.id == recievedID) {
        neededTitle = item.title;
      }
    }
    setTitleChange(neededTitle);
    setEdit(recievedID);

  }
  function handleTitleChange(recievedID) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id == recievedID) {
          return { ...item, title: titleChange }

        }
        return item;
      })
    )
    setEdit(-1);
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
                    {item.id == edit ? (
                      <div id="edit-area">
                        <input type='text' id="edit-input" value={titleChange} onChange={(e) => setTitleChange(e.target.value)} />
                      </div>
                    ) : (!item.isChecked ? <p id="item-title">{item.title}</p> : <del id="item-title">{item.title}</del>)}
                    <div id='buttons'>
                      {item.id == edit ? <button onClick={() => handleTitleChange(item.id)}><FontAwesomeIcon icon={faCheck} /></button> : <button onClick={() => handleTaskEdit(item.id)}><FontAwesomeIcon icon={faPen} /></button>}
                      <button onClick={() => handleTaskDeletion(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <BottomItems numOfCheckedItems={numOfCheckedItems} length={items.length} removeFun={handleRemoveChecked} />


      </div>
    </div>

  )
}

export default App
