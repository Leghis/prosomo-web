import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import PublicIcon from '@material-ui/icons/Public';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    name:{
        textAlign:"center"
    },
    cardHeader:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    boxContent:{
        display:"flex",
        alignItems:"center",
    },
    element1:{

    },
    element2:{
        marginLeft:8,
        color:'#A2D5AB',
        fontWeight:"bold"
    },
    bottomCard:{
        display:"flex",
        justifyContent:"space-around"
    }
});

export default function CardComponent() {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                        <Box className={classes.cardHeader} component="div" m={1}>
                            <Avatar  src="https://cdn.imgbin.com/21/11/11/imgbin-person-illustrator-child-60-a6yviau8r84JezMWfm3yYSM3V.jpg" />
                            <Typography  gutterBottom variant="h5" component="h2">
                                Ayina Maerik
                            </Typography>
                        </Box>
                        <Box className={classes.boxContent} component="div" m={1}>
                            <MailOutlineIcon className={classes.element1}/>
                            <Typography className={classes.element2} variant="body2" color="textPrimary" component="p">
                                Ayinamaerik@gmail.com
                            </Typography>
                        </Box>
                        <Box className={classes.boxContent} component="div" m={1}>
                            <PhoneIphoneIcon className={classes.element1}/>
                            <Typography className={classes.element2} variant="body2" color="textPrimary" component="p">
                                694936708
                            </Typography>
                        </Box>
                        <Box className={classes.boxContent} component="div" m={1}>
                            <LocationCityIcon className={classes.element1}/>
                            <Typography className={classes.element2} variant="body2" color="textPrimary" component="p">
                                Douala
                            </Typography>
                        </Box>
                        <Box className={classes.boxContent} component="div" m={1}>
                            <DeviceHubIcon className={classes.element1}/>
                            <Typography className={classes.element2} variant="body2" color="textPrimary" component="p">
                                Littoral
                            </Typography>
                        </Box>
                        <Box className={classes.boxContent} component="div" m={1}>
                            <MarkunreadMailboxIcon className={classes.element1}/>
                            <Typography className={classes.element2} variant="body2" color="textPrimary" component="p">
                                A9A 9A9
                            </Typography>
                        </Box>
                        <Box className={classes.boxContent} component="div" m={1}>
                            <PublicIcon className={classes.element1}/>
                            <Typography className={classes.element2} variant="body2" color="textPrimary" component="p">
                                Cameroun
                            </Typography>
                        </Box>

                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.bottomCard}>
                    <Button variant="outlined" color="primary">
                        Modifier
                    </Button>
                    <Button variant="contained" color="secondary">
                        Supprimer
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}