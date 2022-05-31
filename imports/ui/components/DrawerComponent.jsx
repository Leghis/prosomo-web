import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from '@material-ui/icons/Settings';
import ListOfRelations from "./modal/ListOfRelations";
import FullScreenDialogComponent from "./FullScreenDialogComponent";
import {Link} from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import deleteOneContact from "../../services/graphql/Contact/deleteOneContact";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  btnStyle: {
    textDecoration: "none",
    color: "black"
  },
});

export default function DrawerComponent({id, data}) {
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [mutateFunction, {dateDelete, loadingDelete, errorDelete}] = deleteOneContact()


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({...state, [anchor]: open});
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation">
      {/*onClick={toggleDrawer(anchor, false)}*/}
      {/*onKeyDown={toggleDrawer(anchor, false)}*/}
      <List>
        <ListOfRelations defaulContact={data.DefaultRelation} id={id}/>
        <FullScreenDialogComponent data={data}/>
      </List>
      <Divider/>
      <List>
        <Link className={classes.btnStyle} to={`/update/${data._id}`}>
          <ListItem button>
            <ListItemIcon><EditIcon/></ListItemIcon>
            <ListItemText primary={"Modifier"}/>
          </ListItem>
        </Link>


        <ListItem onClick={() => mutateFunction(
          {variables: {deleteContactId: data._id}}
        ).then((response) => {
          console.log(JSON.stringify(response))
        }).catch((error) => {
          console.log(JSON.stringify(error))
        })
        } button>
          <ListItemIcon><DeleteIcon/></ListItemIcon>
          <ListItemText primary={"Supprimer"}/>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}
                  variant="outlined"
                  color="primary"
                  startIcon={<SettingsIcon/>}>
            Options
          </Button>

          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
