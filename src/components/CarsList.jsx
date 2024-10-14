/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ListItemAvatar from "@mui/material/ListItemAvatar";

function CarsList({
  cars = [],
  deleteHandler = () => console.error("No deleteHandler provided to Cars List"),
}) {

  return (
    <List>
      {cars.map(({ name, bhp, avatar_url, _id }) => (
        <ListItem key={_id}>
          <ListItemAvatar>
            <Avatar alt="" src={avatar_url} />
          </ListItemAvatar>
          <ListItemText>
            {name} (<Box component="abbr" title="break horse power">BHP</Box>: {bhp})
          </ListItemText>
          <IconButton
            aria-label="update"
            to={`/update/${_id}`}
            component={Link}
          >
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => deleteHandler(_id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}

export default CarsList;