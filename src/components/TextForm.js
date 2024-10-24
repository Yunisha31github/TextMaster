import React, {useState} from "react"

export default function TextForm(props) {
    const handleUpClick = ()=>{
        //console.log("upper case was clicked" + text);
        let newText = text.toUpperCase();
        SetText(newText)
        props.showAlert("Converted to Uppercase!", "success");
    }

    const handleLoClick = ()=>{
        //console.log("lower case was clicked" + text);
        let newText = text.toLowerCase();
        SetText(newText)
        props.showAlert("Converted to Lowercase!", "success");
    }

    const handleClearClick = ()=>{
        let newText = '';
        SetText(newText)
        props.showAlert("Text Cleared!", "success");
    }

    const speak = ()=>{
        let msg = new SpeechSynthesisUtterance() ;
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Started reading your text!", "success");
    }
      
    const handleCopy = () => {
            navigator.clipboard.writeText(text);
            props.showAlert("Copied to Clipboard!", "success");
    };
    

    const handleExtraSpaces= ()=> {
      let newText = text.split(/[ ]+/)
      SetText(newText.join(" "))
      props.showAlert("Extra spaces removed!", "success");
    }

    const handleOnChange = (event)=>{
        console.log('On Change')
        SetText(event.target.value)
    }


    const [text, SetText] = useState('');
  return (
    <>
    <div className="container" style={{color: props.mode==='dark'?'white':'#042743'}}>
      <h1 className="mb-4">{props.heading}</h1>
      <div className="mb-3">
        <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'grey':'white',color: props.mode==='dark'?'white':'#042743'}} id="myBox" rows="8"></textarea>
      </div>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>Convert to Uppercase</button>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleLoClick}>Convert to Lowercase</button>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleClearClick}>Clear Text</button>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy Text</button>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleExtraSpaces}>remove Extra Spaces</button>
      <button disabled={text.length===0} type="submit" className="btn btn-primary mx-2 my-2" onClick={speak}>Speak</button>
    </div>

    <div className="container my-3" style={{color: props.mode==='dark'?'white':'#13466e'}}>
        <h2>Your text summary</h2>
        <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length}Characters</p>
        <p> <b> {0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length}</b> Minutes</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Nothing to preview!"}</p>
    </div>
    </>
  )
}
