import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {FixedSizeList} from 'react-window';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  Typography
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 300,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));
let datas = null

function renderRow(props) {
  const classes = useStyles();
  const {index, style} = props;
  const [checked, setChecked] = React.useState([1]);
  const labelId = `checkbox-list-secondary-label-${index}`;
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
      <IconButton edge="end" aria-label="comments">
        <CreateIcon color={"primary"}/>
      </IconButton>
      <IconButton edge="end" aria-label="comments">
        <DeleteForeverIcon color={"secondary"}/>
      </IconButton>
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default function VirtualizedListRelations({data}) {
  const classes = useStyles();
  datas = data.getAllRelation

  return (
    <div className={classes.root}>
      <FixedSizeList height={300} width={300} itemSize={60} itemCount={data.getAllRelation.length}>
        {renderRow}
      </FixedSizeList>
    </div>
  )
}
