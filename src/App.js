import './App.css';
import React, {useState} from "react";

function App() {

    const [text, setText] = useState([]);
    const [show, setShow] = useState(false);
    let textRef = React.createRef();

    const saveNote = () => {
        let inputVal = textRef.current.value;
        if(inputVal && !text.includes(inputVal)) {
            setText(prevText => prevText ? prevText.concat(inputVal) : [inputVal])
            setShow(true);
        }

        else if(inputVal && text.includes(inputVal)){
            alert('duplicate note')
        }
    }

    const handleClear = () => {
        textRef.current.value = ""
        setText("")
    }

    const deleteNote = (event) => {
        if(event?.target?.id){
            setText(text.filter(e => e !== event.target.id.split("_")[1]));
            textRef.current.value = ""
        }
    }

    const showData = () => {
        return (
            <div className="noteDiv"> <b>Notes:</b>
                {show && text.length > 0 && text.map((item, index) => {
                    return(
                        <div key={index}>
                            {item} <button id={index+"_"+item} onClick={deleteNote}>-</button>
                        </div>
                    )})
                }
            </div>
        );
    }

    return (
        <div className="App">
          <div className="Main">
              <div><input ref={textRef} type="text" placeholder="write a note" />
                  <button onClick={saveNote}>+</button>
                  <button onClick={handleClear}>Clear Notes</button>
              </div>

              {showData()}
          </div>
        </div>
   );
}

export default App;
