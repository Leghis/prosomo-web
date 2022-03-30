import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="secondary" startIcon={<MoreVertIcon />} onClick={handleClickOpen}>
                plus d'info
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Detail du contact
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Modifier
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <ListItemText primary="Prénom" secondary={data.surname} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Nom" secondary={data.name} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Courriel" secondary={data.email} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Téléphone" secondary={data.phone} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Ville" secondary={data.town} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Région" secondary={data.region} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Boite postal" secondary={data.box} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Pays" secondary={data.country} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Commentaire 1" secondary={data.comment1} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Commentaire 2" secondary={data.comment2} />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}