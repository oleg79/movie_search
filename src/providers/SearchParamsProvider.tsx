import * as React from 'react'
import {VideoType} from '../components/VideoCard';

type Year = number;
type Type = VideoType | null;
type SetYear = (year: Year) => void;
type SetType = (type: Type) => void;

interface State {
  year: Year;
  type: Type;
  isActive: boolean;
}

export interface SearchParamsContextValue extends State{
  setYear: SetYear;
  setType: SetType;
  toggleActive: () => void;
}

export const SearchParamsContext = React.createContext<SearchParamsContextValue>({
  year: 2019,
  type: null,
  isActive: false,
  setYear: year => {},
  setType: type => {},
  toggleActive: () => {},
});

export default class SearchParamsProvider extends React.PureComponent<{}, State> {
  state = {
    isActive: false,
    year: 2019,
    type: null,
  };

  setYear: SetYear = year => this.setState({ year });

  setType: SetType = type => this.setState({ type });

  toggleActive: () => void = () => this.setState({ isActive: !this.state.isActive });

  render() {
    return (
      <SearchParamsContext.Provider
        value={{
          isActive: this.state.isActive,
          year: this.state.year,
          type: this.state.type,
          setYear: this.setYear,
          setType: this.setType,
          toggleActive: this.toggleActive
        }}
      >
        { this.props.children }
      </SearchParamsContext.Provider>
    );
  }
}
