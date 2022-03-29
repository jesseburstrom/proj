import "./Dropdown.css";

export const Dropdown = ({ defaultTheme, onChange, data }) => {
  return (
    <select className="select" defaultValue={defaultTheme} onChange={onChange}>
      {Object.keys(data)
        .map((theme, index) => {
          return (
            <option key={index} value={theme}>
              {theme}
            </option>
          );
        })}
    </select>
  );
};

export const DropdownGen = ({ selected, onChange, data }) => {
  return (
    <select className="select" defaultValue={selected} onChange={onChange}>
      {data
        .map((theme, index) => {
          return (
            <option key={index} value={index}>
              {theme}
            </option>
          );
        })}
    </select>
  );
};

export const DropdownTxt = ({ selected, onChange, data }) => {
  return (
    <select className="select" defaultValue={selected} onChange={onChange}>
      {data
        .map((theme, index) => {
          return (
            <option key={index} value={theme}>
              {theme}
            </option>
          );
        })}
    </select>
  );
};

