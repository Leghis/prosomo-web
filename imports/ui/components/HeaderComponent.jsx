import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import {useTranslation} from 'react-i18next';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {alpha, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Switch from '@material-ui/core/Switch';
import {Link} from "react-router-dom";
import Cookies from 'universal-cookie';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  link:{
    textDecoration:"none",
    color:"white"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  switch:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    marginLeft:10
  }
}));


export default function HeaderComponent(props) {
  const classes = useStyles();
  const [search, setSearch] = useState()
  const {t, i18n} = useTranslation();
  const cookies = new Cookies();


  const handleChange = async(event) => {
    if(event.target.checked){
      await i18n.changeLanguage("fr")
      cookies.set('lng', 'fr', { path: '/' });
    }else{
      await i18n.changeLanguage("en")
      cookies.set('lng', 'en', { path: '/' });
    }
  };



  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link className={classes.link} to={"/"}>
              Prosomo Contact
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              value={search}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{'aria-label': 'search'}}
            />
          </div>

          <div className={classes.switch}>
            <h6>en</h6>
            <Switch
              onChange={handleChange}
              defaultChecked={cookies.get("lng")?cookies.get("lng") === "fr":true}
              color="default"
              inputProps={{ 'aria-label': 'checkbox with default color' }}
            />
            <h6>fr</h6>
          </div>

        </Toolbar>
      </AppBar>
    </div>
  );
}
