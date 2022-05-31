import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {useHistory} from "react-router-dom";
import {ListItemIcon} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {useTranslation} from "react-i18next";


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialogComponent({data}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  //Hook to perform a redirection after the registration of a contact
  let history = useHistory();

  const {t, i18n} = useTranslation();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const UpdateContact = () => {
    history.push(`/update/${data._id}`)
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/*<Button variant="outlined" color="secondary" */}
      {/*        startIcon={<MoreVertIcon />} onClick={handleClickOpen}>*/}
      {/*    plus d'info*/}
      {/*</Button>*/}

      <ListItem onClick={handleClickOpen} button>
        <ListItemIcon><MoreVertIcon/></ListItemIcon>
        <ListItemText primary={t("plusDeDetail")}/>
      </ListItem>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {t("detailDuContact")}
            </Typography>
            <Button autoFocus color="inherit" onClick={UpdateContact}>
              {t("modifier")}
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary={t("table.prenom")} secondary={data.surname}/>
          </ListItem>
          <Divider/>
          <ListItem button>
            <ListItemText primary={t("table.nom")} secondary={data.name}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary={t("table.courriel")} secondary={data.email}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary={t("table.telephone")} secondary={data.phone}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary={t("table.ville")} secondary={data.town}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary={t("table.region")} secondary={data.region}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary={t("table.bp")} secondary={data.box}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary={t("table.pays")} secondary={data.country}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary={t("table.commentaire01")} secondary={data.comment1}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary={t("table.commentaire02")} secondary={data.comment2}/>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
