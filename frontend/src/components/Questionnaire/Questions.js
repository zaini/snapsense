import { useState } from "react";
import { Button, FormControlLabel, Radio, RadioGroup, FormControl } from '@material-ui/core';

const Questionnaire = () => {
  const [questionnaire, setQuestionnaire] = useState({
    "How is the pain?": ["Fine", "Bad", "OK", "Not Bad"],
  });

  return (
    <div> 
      <div className='center'>
        {Object.entries(questionnaire).map((e, i) => {
          const key = e[0];
          const values = e[1]; 

          return (
            <div className= 'form pa4 br3 shadow-3' >
              {key}
              <form>
                { values.map( (e) => (
                  <div>
                    <input type="radio" name="options" defaultValue={e} />
                    <label htmlFor="options">{e}</label>
                  </div>
                ))}
              </form>              
            </div>
          )})
        }
      </div>
      <br/>
      <div className='center'>
        <div className='form center pa4 br3 shadow-3'>
          <div className='grow'>
            <Button>Back</Button>
            <Button style={{marginRight:'90px'}} >Next</Button>
            <Button onClick={() => { alert('Thanks for Submitting') }}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;