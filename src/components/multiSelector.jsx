import React from 'react';
import { typography } from '@material-ui/system';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'aapl',
  'gluu',
  'mu',
  'ntap',
  'msft',
  'intc',
  'znga',
  'csco',
  'siri',
  'jd',
  'fb',
  'nvda',
  'bl',
  'ftnt',
  'chrs',
  'loco',
  'catm',
  'cnce',
  'fizz',
  'acor',
  'fldm',
  'sptn',
  'cent',
  'xent',
  'adap',
  'gpro',
  'brks',
  'sgms',
  'iova',
  'aaon',
  'eigi',
  'amzn',
  'nflx',
  'tsla'
];

export default class MultiSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName:[]
    }
  }
  handleChange(event) {
    const {onChange} = this.props;
    this.setState({
      itemName:event.target.value
    })
    onChange(event.target.value);
  }

  render() {
    const {itemName} = this.state;
    return (
      <div className="multiSelector">
        <FormControl className="formControl">
          <InputLabel htmlFor="select-multiple-chip">Select Tickers</InputLabel>
          <Select
            multiple
            value={itemName}
            onChange={this.handleChange.bind(this)}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className="chips">
                {selected.map(value => (
                  <Chip key={value} label={value} className="chip" />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem key={name} value={name} style={{ fontWeight: itemName.indexOf(name) === -1 ? typography.fontWeightRegular : typography.fontWeightMedium,
  }}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}