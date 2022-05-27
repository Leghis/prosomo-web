import React, {useEffect, useState} from "react";
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ReactSelect from "../components/ReactSelect";
import TabFilterComponent from "../components/TabFilterComponent";
import getRegions from "../../services/graphql/getRegions";
import getFilterRegions from "../../services/graphql/filtersRegions";
import getBox from "../../services/graphql/getBox";
import getFilterBox from "../../services/graphql/filtersBox";

const useStyles = makeStyles({
  root: {
    margin: 10
  },
  reactSelect: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: 20
  },
  test: {
    flex: 1,
    margin: 2
  },
  showTable:{
    display:"flex",
  },
  showTableItem:{
    padding:5
  }
});

function ReportView() {
  const classes = useStyles();
  const [regions, setregions] = useState(null)
  const [box, setBox] = useState(null)

  const [selectRegion, setSelectRegion] = useState("Tout")
  const [selectBox, setSelectBox] = useState("Tout")


  const {dataRegion} = getRegions()
  const {dataBox} = getBox()

  const {dataFilterR} = getFilterRegions(selectRegion === 'Tout' ? null : selectRegion)
  const {dataFilterB} = getFilterBox(selectBox === 'Tout'?null:selectBox)

  useEffect(() => {
    let tab = []
    tab.push({value: "Tout", label: "Tout"})
    if(dataRegion){
      dataRegion.getRegions.map(res => {
        tab.push({value: res, label: res})
      })
    }
    console.log(tab)
    setregions(tab)
  }, [dataRegion]);

  useEffect(() => {
    let tab = []
    tab.push({value: "Tout", label: "Tout"})
    if(dataBox){
      dataBox.getBox.map(res => {
        tab.push({value: res, label: res})
      })
    }
    setBox(tab)
  }, [dataBox]);


  const HandleSelectRegion = (e) => {
    setSelectRegion(e)
  }

  const HandleSelectBp = (e) => {
    setSelectBox(e)
    console.log(selectBox)
  }


  return (
    <Box className={classes.root} component="div" m={1}>
      <div className={classes.reactSelect}>
        <div className={classes.test}>
          <Typography variant="subtitle2" component="h6" gutterBottom>
            Filtre par province
          </Typography>
          <ReactSelect valueselect={HandleSelectRegion} options={regions}/>
        </div>
        <div className={classes.test}>
          <Typography variant="subtitle2" component="h6" gutterBottom>
            Filtre par boite postal
          </Typography>
          <ReactSelect valueselect={HandleSelectBp} options={box}/>
        </div>
      </div>
      <div className={classes.showTable}>
        <div className={classes.showTableItem}>
          {
            dataFilterR && <TabFilterComponent msg={"Tableau de filtre de regions"} header={ {Name:"Region"} } data={dataFilterR.filterRegion}/>
          }
        </div>
        <div className={classes.showTableItem}>
          {
            dataFilterB && <TabFilterComponent msg={"Tableau de filtre de boite postale"} header={ {Name:"Code postal"} } data={dataFilterB.filterBox}/>
          }
        </div>
      </div>
    </Box>
  )
}

export default ReportView
