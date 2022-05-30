import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VirtualizedListRelations from "../VirtualizedListRelations"
import {Button, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {Link} from "react-router-dom";
import getAllRelation from "../../../services/graphql/Relation/getAllRelation";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  addRelation: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
  textButton: {
    textDecoration: "none"
  }
}));

export default  function ListOfRelations({id}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {loading, error, data} =  getAllRelation(id)
  console.log(id)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/*<Button startIcon={<AccountCircleIcon/>} variant="outlined" onClick={handleOpen}>*/}
      {/*  Relations*/}
      {/*</Button>*/}

      <ListItem onClick={handleOpen} button>
        <ListItemIcon><AccountCircleIcon/></ListItemIcon>
        <ListItemText primary={"Relations"}/>
      </ListItem>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Liste de contact</h2>

            {/*liste deroulante de contact*/}
            {
              data?data.getAllRelation.length === 0?<Alert icon={false} severity="success">Liste de contact vide</Alert>:<VirtualizedListRelations data={data}/>:""
            }

            {/*bouton pour ajouter un contact*/}
            <div className={classes.addRelation}>
              <Button className={classes.addRelation} variant="outlined" color="primary" startIcon={<AddIcon/>}>
                <Link className={classes.textButton} to={"/addRelation/" + id}>
                  Ajouter une relation
                </Link>
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
