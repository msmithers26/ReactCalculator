import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import { Button } from '@material-ui/core';
import { green, purple } from '@material-ui/core/colors';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './style.css';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import TextField from '@material-ui/core/TextField';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));


const PurpleButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const Display = props => <div id="calc-display" className="row-1-2 col-1-4"><span id="eq">{props.equation}</span><span id="dis">{props.display}</span></div>;

const NewButton = props => <Button 
type="button" 
id={props.id} 
value={props.value} 
className={props.class} 
variant="contained" 
fullWidth = {true}
 color="primary"
onClick={props.click}>{props.display}</Button>;

const NewPurpleButton = props => <PurpleButton 
type="button" 
id={props.id} 
value={props.value} 
className={props.class} 
variant="contained" 
fullWidth = {true}
 color="primary"
onClick={props.click}>{props.display}</PurpleButton>;

const myButton = props => <button type="button" id={props.id} value={props.value} className={props.class} onClick={props.click}>{props.display}</button>;
class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: 'Calculator App',
      display: "0",
      equation: ""
    };
    this.numInput = this.numInput.bind(this);
    this.Input1 = this.Input1.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.decInput  = this.decInput.bind(this);
    this. calculate  = this.calculate.bind(this);
   this. operInput = this.operInput.bind(this);
  }
clearInput(){
    this.setState({
      display: "0",
      equation: ""
    });
  }

  Input1(){
    this.setState({
      display: "1",
      equation: ""
    });
  }

    numInput(e){
    if(this.state.equation.match(/[0-9\.]$/) && !this.state.equation.includes("=")){
      if(this.state.equation.match(/[+\-*\/]/) == null){
        let val = this.state.equation + e.currentTarget.value;
        this.setState({
          display: val,
          equation: val
        });
      } else {
        this.setState({
          display: this.state.display + e.currentTarget.value,
          equation: this.state.equation + e.currentTarget.value
        });
      }
    } else if(this.state.equation.match(/[+\-*\/]$/)){
      let val = this.state.equation + e.currentTarget.value;
      this.setState({
        display: e.currentTarget.value,
        equation: val
      });
    } else if(this.state.display === "0" && e.currentTarget.value !== "0" || this.state.equation.includes("=")) {
      this.setState({
        display: e.currentTarget.value,
        equation: e.currentTarget.value
      });
    }
  }

  decInput(e){
    if(this.state.equation == "" || this.state.equation.includes("=")){
      let val = '0.';
      this.setState({
        display: val,
        equation: val
      });
    } else if(this.state.equation.match(/[+\-*\/]$/)){
      let val = '0.';
      this.setState({
        display: val,
        equation: this.state.equation + val
      });
    } else if(!this.state.display.includes(".")){
      this.setState({
        display: this.state.display + e.currentTarget.value,
        equation: this.state.equation + e.currentTarget.value
      });
    }
  }

 operInput(e){
    if(this.state.equation.includes("=")){
      let val = this.state.display;
      val += e.currentTarget.value;
      this.setState({
        equation: val
      });
    } else {
      if(this.state.equation != "" && this.state.equation.match(/[*\-\/+]$/) == null){
        let val = this.state.equation;
        val += e.currentTarget.value;
        this.setState({
          equation: val
        });
      } else if(this.state.equation.match(/[*\-\/+]$/) != null){
        let val = this.state.equation;
        val = val.substring(0, (val.length-1));
        val += e.currentTarget.value;
        this.setState({
          equation: val
        });
      }
    }
  }
calculate(){
    if(this.state.equation.includes("=")){
      let val = `${this.state.display} = ${this.state.display}`;
      this.setState({
        equation: val
      });
    } else if(this.state.equation != "" && this.state.equation.match(/[+\-*\/]/) != null && this.state.equation.match(/[+\-*\/]$/) == null) {
      let result = Number.isInteger(eval(this.state.equation)) ? eval(this.state.equation) : parseFloat(eval(this.state.equation).toFixed(5));
      let val = this.state.equation;
      val += ` = ${result}`;
      this.setState({
        display: result,
        equation: val
      });
    }
  }

  render() {
     
    return (
     
       

        <div className={useStyles.root}>
        
         <Hello name={this.state.name} />
      
         <TextField
          id="outlined-full-width"
          label="Problem "
          style={{ margin: 8 }}
          placeholder={this.state.display}
          helperText=""
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        >
        <Display equation={this.state.equation} display={this.state.display} />
        </TextField>
         
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={useStyles.paper}>
      
          </Paper>
        </Grid>
        {/* AC +- % */}
        <Grid item xs={9}>
          <Paper className={useStyles.paper}>
          <Button  
           variant="contained" 
           onClick={this.clearInput}
           fullWidth = {true}
           color="default">
           AC</Button>
           </Paper>
        </Grid>
        
        <Grid item xs={3}>
          <Paper className={useStyles.paper}>
            <NewPurpleButton id="divide" value="/" display="&divide;"  click={this.operInput} />
          </Paper>
        </Grid>

         {/*7 8 9 mult */}
         <Grid item xs={3}>
          <Paper className={useStyles.paper}>
          <NewButton id="seven" value="7" display="7"  click={this.numInput} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={useStyles.paper}>
         <NewButton id="eight" value="8" display="8"  click={this.numInput} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={useStyles.paper}>
          <NewButton id="nine" value="9" display="9"  click={this.numInput} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={useStyles.paper}>
          <NewPurpleButton id="multiply" value="*" display="&times;"  click={this.operInput} />
          </Paper>
        </Grid>



         {/* 4 5 6 subtraction */}
         <Grid item xs={3}>
          <Paper className={useStyles.paper}>
          <NewButton id="four" value="4" display="4"  click={this.numInput} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={useStyles.paper}>
          <NewButton id="five" value="5" display="5"  click={this.numInput} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={useStyles.paper}>
          <NewButton id="six" value="6" display="6"  click={this.numInput} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={useStyles.paper}>
          <NewPurpleButton id="subtract" value="-" display="-"  click={this.operInput} />
          </Paper>
        </Grid>


        {/* 1 2 3 subtraction */}
        <Grid item xs={3}>
          <Paper className={useStyles.paper}>
          <NewButton id="one" value="1" display="1"  click={this.numInput} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={useStyles.paper}>
          <NewButton id="two" value="2" display="2"  click={this.numInput} />

          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={useStyles.paper}>
          <NewButton id="three" value="3" display="3"  click={this.numInput} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={useStyles.paper}>
          <NewPurpleButton id="add" value="+" display="+"  click={this.operInput} />
          </Paper>
        </Grid>

        {/* 0 . =*/}
        <Grid item xs={6}>
          <Paper className={useStyles.paper}>
          <NewButton id="zero" value="0" display="0"  click={this.numInput} />
          </Paper>
        </Grid>
        
        <Grid item xs={3}>
          <Paper className={useStyles.paper}>
          <NewButton id="decimal" value="." display="."  click={this.decInput} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={useStyles.paper}>
           <NewPurpleButton id="equals" value="=" display="="  click={this.calculate} />
          </Paper>
        </Grid>
      </Grid>
      
    </div>
      
    );
  }
}


render(<App />, document.getElementById('root'));
