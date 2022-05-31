import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const rows = null

export default function TabFilterComponent({data, header, msg}) {
  const { t, i18n } = useTranslation();

  let total = null
  data.map(res=>{
    total+=res.total
  })

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>{msg}</caption>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6" gutterBottom>
                {header.Name}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" gutterBottom>
                {t("total")}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.state ? row.state : row.postalCode}</TableCell>
                <TableCell>{row.total}</TableCell>
              </TableRow>
            ))
          }
          <TableRow>
            <TableCell>
              <Typography variant="h6" gutterBottom>
                {t("total")}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" gutterBottom>
                {total}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
