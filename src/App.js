import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Chart from './components/chart';
import MultiSelector from './components/multiSelector';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const chartList = ['openPrice', 'closePrice', 'PERatio', 'SV', 'EPS', 'TH', 'TL'];
const dataList = new Array(chartList.length).fill([]);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
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
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default class App extends React.Component {

  handleChange(event, newValue) {
    this.setState({value:newValue});
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  onChange(index, value) {
    if (index !== 0) {
      return;
    }
    if (value.length >= 0) {
      let tickers = value.join(',');
      fetch('http://47.99.220.232:3389/api/stocks/chart?tickers=' + tickers)
      .then(res => res.json())
      .then(result => {
        dataList[index] = result.data;
        this.setState({});
      }).catch(e => console.log('error:', e))
    }
  }

  render() {
    let value = this.state.value;
    return (
      <div className="App">
        <CssBaseline />
        <Container maxWidth="lg">
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange.bind(this)}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Open Price" {...a11yProps(0)} />
              <Tab label="Close Price" {...a11yProps(1)} />
              <Tab label="P/E Ratio" {...a11yProps(2)} />
              <Tab label="Share Volume" {...a11yProps(3)} />
              <Tab label="Earnings Per Share (EPS)" {...a11yProps(4)} />
              <Tab label="Today's High" {...a11yProps(5)} />
              <Tab label="Today's Low" {...a11yProps(6)} />
            </Tabs>
          </AppBar>
          {chartList.map((item, index) => 
                          <TabPanel key={'key' + index} value={value} index={index}>
                            <MultiSelector onChange={this.onChange.bind(this, index)} />
                            <Chart data={dataList[index]} title={item}/>
                          </TabPanel>
                      )}
        </Container>
      </div>
    );
  }
}

