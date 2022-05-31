import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {FixedSizeList} from 'react-window';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import StarRateIcon from '@material-ui/icons/StarRate';
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  Typography
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {Link} from "react-router-dom";
import deleteOneRelation from "../../services/graphql/Relation/deleteOneRelation";
import updateOneRelation from "../../services/graphql/Relation/updateOneRelation";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 300,
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));
let datas = null
let dfContact = null

function renderRow(props) {
  const classes = useStyles();
  const {index, style} = props;
  const [mutateFunction,{dateDelete, loadingDelete, errorDelete}] = deleteOneRelation()
  const [updateRelation] = updateOneRelation()

  const [checked, setChecked] = React.useState([1]);
  const labelId = `checkbox-list-secondary-label-${index}`;
  const setDefaulContact = () => {
    if(dfContact){
      updateRelation(
        {variables: {
            refreshRelationId: dfContact._id,
            relation: {
              "default": false
            }
          }
        }
      ).then(async (response) => {
        await updateRelation(
          {variables: {
              refreshRelationId: datas[index]._id,
              relation: {
                "default": true
              }
            }
          }
        )
      }).catch((error) => {
      })
    }else{
      updateRelation(
        {variables: {
            refreshRelationId: datas[index]._id,
            relation: {
              "default": true
            }
          }
        }
      ).then((response) => {
        console.log(JSON.stringify(response))
      }).catch((error) => {
        console.log(JSON.stringify(error))
      })
    }
  }

  return (
    <ListItem button style={style} key={index}>
      <ListItemAvatar>
        <Avatar
          alt={`image test`}
          src={"https://media.istockphoto.com/vectors/user-avatar-profile-icon-black-vector-illustration-vector-id1209654046?k=20&m=1209654046&s=612x612&w=0&h=Atw7VdjWG8KgyST8AXXJdmBkzn0lvgqyWod9vTb2XoE="}
        />
      </ListItemAvatar>
      {/*<ListItemText primary={`Item ${index + 1}`}/>*/}
      <ListItemText
        primary={datas[index].name}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary">
              {datas[index].phone}
            </Typography>
          </React.Fragment>
        }
      />
      <IconButton onClick={setDefaulContact} edge="end" aria-label="comments">
          <StarRateIcon/>
      </IconButton>
      <IconButton edge="end" aria-label="comments">
        <Link to={`/updateRelation/${datas[index]._id}`}>
          <CreateIcon color={"primary"}/>
        </Link>
      </IconButton>
      <IconButton onClick={() => mutateFunction(
        {variables: {deleteRelationId: datas[index]._id}}
      ).then((response) => {
        console.log(JSON.stringify(response))
      }).catch((error) => {
        console.log(JSON.stringify(error))
      })
      } edge="end" aria-label="comments">
        <DeleteForeverIcon color={"secondary"}/>
      </IconButton>
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default function VirtualizedListRelations({data, defaulContact}) {
  const classes = useStyles();
  datas = data.getAllRelation
  dfContact = defaulContact

  return (
    <div className={classes.root}>
      <FixedSizeList height={300} width={400} itemSize={60} itemCount={data.getAllRelation.length}>
        {renderRow}
      </FixedSizeList>
    </div>
  )
}
