import "./Dropdown.css";

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
