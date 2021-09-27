import Modal from '../UI/Modal';
import classes from './Message.module.css'
import tropy from '../asset/trophy.png'
import score from '../asset/score.png'
const Message=(props)=>{

    return(<Modal onClose={props.onClose}>
        <div className={classes.content}>

        <img src={props.win?tropy:score} alt="Win image"/>
        <h1>{props.message}</h1>
        <div className={classes.actions}>
          <button type="button" onClick={props.onClose}>
            Cancel
          </button>
        </div>
        </div>
    </Modal>)
};

export default Message;